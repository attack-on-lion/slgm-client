import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const gifticonId = searchParams.get('gifticonId');
  const userId = searchParams.get('userId');

  if (!code || !gifticonId || !userId) {
    return NextResponse.redirect(new URL('/error?message=Invalid QR Code', request.url));
  }

  try {
    // 기프티콘 사용 처리 API 호출 (fetch 사용)
    const response = await fetch(`${request.nextUrl.origin}/api/server/users/${userId}/gifticons/${gifticonId}/use`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API 호출 실패: ${response.status} ${response.statusText}`);
    }
    
    // 성공 시 payment/success 페이지로 리다이렉트 (파라미터 포함)
    const successUrl = new URL('/payment/success', request.url);
    successUrl.searchParams.set('code', code);
    successUrl.searchParams.set('gifticonId', gifticonId);
    successUrl.searchParams.set('userId', userId);
    return NextResponse.redirect(successUrl);
  } catch (error) {
    console.error('QR 스캔 처리 실패:', error);
    return NextResponse.redirect(new URL('/error?message=Gifticon Usage Failed', request.url));
  }
}
