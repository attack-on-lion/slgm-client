import { createReverseProxy } from '@/utils/proxy';

const origin =  "https://api.slgmslgm.com/api";

export const { GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD } = createReverseProxy(origin, {
  pathReplace: ['/api/server', ''],
});
export const revalidate = 0;
export const dynamic = 'force-dynamic';
