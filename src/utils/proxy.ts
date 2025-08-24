import { NextRequest, NextResponse } from "next/server";

export type Route<
  T extends Request = Request,
  U extends Response = Response
// V extends { params: { [s in string]: string | string[] } } = {
//   params: { [s in string]: string | string[] };
// }
> = (request: T, context?: any) => Promise<U>;
export type Middleware<
  T extends Request = Request,
  U extends Response = Response
> = (next: Route<T, U>) => Route<T, U>;

const requestLogger = (
  request: NextRequest,
  response: NextResponse,
  duration: number,
  exceptStatus?: number[]
) => {
  if (exceptStatus?.includes(response.status)) return;
  console.log(
    `${request.method} ${request.nextUrl.pathname} ${response.status} in ${duration}ms`
  );
};


export function requestLoggerMiddleware(
  next: Route<NextRequest, NextResponse>,
  exceptStatus?: number[]
): Route<NextRequest, NextResponse> {
  return async (request, context) => {
    const requestClone = new NextRequest(request.clone());
    const start = Date.now();
    const response = await next(request, context);
    const responseClone = new NextResponse(response.body, response);
    requestLogger(
      requestClone,
      responseClone,
      Date.now() - start,
      exceptStatus
    );
    return response;
  };
}
const toNextResponse = async (response: Response) => {
  if (response instanceof NextResponse) return response;
  if (response.status === 204) return new NextResponse(null, { status: 204 });
  const contentType = response.headers.get("Content-Type")?.toLowerCase();
  if (!contentType)
    return new NextResponse("No `Content-Type` on headers", { status: 500 });
  const textCase =
    contentType.includes("text/html") ||
    contentType.includes("text/plain") ||
    contentType.includes("text/javascript") ||
    contentType.includes("application/xml") ||
    contentType.includes("application/json");
  const blobCase =
    contentType.includes("image/jpeg") ||
    contentType.includes("image/png") ||
    contentType.includes("image/webp") ||
    contentType.includes("application/pdf");
  const formDataCase = contentType.includes("multipart/form-data");
  const contentPromise = textCase
    ? response.text()
    : blobCase
      ? response.blob()
      : formDataCase
        ? response.formData()
        : Promise.reject();
  const content = await contentPromise;
  const headers = new Headers(response.headers);
  headers.delete("Content-Encoding");
  headers.set("Content-Type", contentType);
  const status = response.status;
  const statusText = response.statusText;
  const url = response.url;
  const init = {
    headers,
    status,
    statusText,
    url,
  };

  return new NextResponse(content, init);
};

/**
 * Creates a reverse proxy function that forwards requests to a specified origin. \
 * It can be work for content types like JSON, HTML, Plain Text.
 * @param origin - The URL of the origin server to forward requests to.
 * @param options - An object containing options for the reverse proxy.
 * @returns An object containing the reverse proxy functions for various HTTP methods.
 * @example
 * ```ts
 * // src/api/[...path]/route.ts
 *
 * export const { GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD } =
 *   createReverseProxy("https://api.example.com", {
 *     pathReplace: ["/api", ""],
 *     useRequestLogger: false,
 *   });
 * ```
 */
export const createReverseProxy = (
  /**
   * The URL of the origin server to forward requests to.
   * @example "https://api.example.com"
   */
  origin: string,
  {
    pathReplace,
    useRequestLogger,
    handleError,
    handleResponse,
  }: {
    /**
     * Optional. An array containing a regular expression or string to replace in the request path and its replacement string.
     * @default undefined // No replacement
     */
    pathReplace?: [RegExp | string, string];
    /**
     * Optional. A boolean indicating whether to use a request logger middleware.
     * @default true
     */
    useRequestLogger?: boolean;
    /**
     * Optional. An array containing status codes to exclude from print request logs. (When `useRequestLogger` is true)
     * @default [] // No exclusion
     */
    exceptStatus?: number[];
    /**
     * Optional. A function that handles errors when forwarding requests to the origin server
     * @default (error: TypeError) => { console.error(error); return new NextResponse("Error", { status: 500 }); }
     */
    handleError?: (error: TypeError) => Response;
    /**
     * Optional. A function that handles errors when receiving responses from the origin server
     * @default undefined
     */
    handleResponse?: (response: Response) => Response;
  } = {
      pathReplace: undefined,
      useRequestLogger: true,
      handleError: (error: TypeError) => {
        console.error(error);
        return new NextResponse("Error", { status: 500 });
      },
      handleResponse: undefined,
    }
) => {
  const proxyOrigin: Route<NextRequest, NextResponse> = async (
    request: NextRequest
  ) => {
    handleError =
      handleError ||
      ((e) => {
        console.error(e);
        return new NextResponse("Error", { status: 500 });
      });
    const { nextUrl, method } = request;
    const pathname = pathReplace
      ? nextUrl.pathname.replace(...pathReplace)
      : nextUrl.pathname;
    const search = nextUrl.search;
    const fullUri = origin + pathname + search;
    const headers = createProxyHeader(request);
    const body = await request.text();
    const response = await fetch(fullUri, {
      body: body ? body : undefined,
      method,
      headers,
      next: { revalidate: 0 },
    })
      .then(handleResponse)
      .catch(handleError);
    return toNextResponse(response);
  };
  useRequestLogger = useRequestLogger != false;
  const proxy = useRequestLogger
    ? requestLoggerMiddleware(proxyOrigin)
    : proxyOrigin;

  console.log(`[Reverse Proxy Util] Created a reverse proxy for ${origin}`);
  const exportObject = {
    GET: proxy,
    POST: proxy,
    PUT: proxy,
    DELETE: proxy,
    PATCH: proxy,
    OPTIONS: proxy,
    HEAD: proxy,
  } as const;
  return exportObject;
};

export const createProxyHeader = (requestLike: {
  headers: Headers;
  cookies: { toString: () => string };
}) => {
  const headers = new Headers();
  const contentType = requestLike.headers.get("Content-Type");
  const xForwardedFor = requestLike.headers.get("X-Forwarded-For");
  const userAgents = requestLike.headers.get("User-Agent");
  if (contentType) headers.set("Content-Type", contentType);
  if (userAgents) headers.append("User-Agent", userAgents);
  if (xForwardedFor) headers.append("X-Forwarded-For", xForwardedFor);
  headers.append("Cookie", requestLike.cookies.toString());
  return headers;
};
