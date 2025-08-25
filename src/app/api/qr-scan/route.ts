import storeApi from "@/services/api/store";
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
    // 기프티콘 사용 처리 API 호출
    await storeApi.implementGifticon(parseInt(userId), parseInt(gifticonId));
    
    // 성공 시 payment/success 페이지로 리다이렉트
    return NextResponse.redirect(new URL('/payment/success', request.url));
  } catch (error) {
    console.error('QR 스캔 처리 실패:', error);
    return NextResponse.redirect(new URL('/error?message=Gifticon Usage Failed', request.url));
  }
}
