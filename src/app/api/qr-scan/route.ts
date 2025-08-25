import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const gifticonId = searchParams.get('gifticonId');

  if (!code || !gifticonId) {
    return NextResponse.redirect(new URL('/error?message=Invalid QR Code', request.url));
  }

  try {
    // 기프티콘 사용 처리 API 호출 (PATCH 메서드)
    const response = await fetch(`${request.nextUrl.origin}/api/server/users/1/gifticons/${gifticonId}/use`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      // 성공 시 payment/success 페이지로 리다이렉트
      return NextResponse.redirect(new URL('/payment/success', request.url));
    } else {
      // 실패 시 에러 페이지로 리다이렉트
      return NextResponse.redirect(new URL('/error?message=Gifticon Usage Failed', request.url));
    }
  } catch (error) {
    console.error('QR 스캔 처리 실패:', error);
    return NextResponse.redirect(new URL('/error?message=Network Error', request.url));
  }
}
