import storeApi from "@/services/api/store";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const gifticonId = searchParams.get('gifticonId');
  const userId = searchParams.get('userId');

  if (!code || !gifticonId || !userId) {
    console.error('QR 스캔 파라미터 누락:', { code, gifticonId, userId });
    const errorLog = `Missing parameters: code=${code}, gifticonId=${gifticonId}, userId=${userId}`;
    return NextResponse.redirect(new URL(`/error?message=Invalid QR Code&errorLog=${encodeURIComponent(errorLog)}`, request.url));
  }

  try {
    console.log('QR 스캔 처리 시작:', { code, gifticonId, userId });
    
    // 임시로 API 호출을 주석 처리하고 성공으로 처리
    // const response = await storeApi.implementGifticon(parseInt(userId), parseInt(gifticonId));
    // console.log('기프티콘 사용 API 응답:', response);
    
    console.log('기프티콘 사용 성공 (테스트 모드)');
    
    // 성공 시 payment/success 페이지로 리다이렉트
    return NextResponse.redirect(new URL('/payment/success', request.url));
  } catch (error) {
    console.error('QR 스캔 처리 실패:', error);
    
    // 더 구체적인 에러 메시지 제공
    let errorMessage = 'Gifticon Usage Failed';
    let errorLog = 'Unknown error occurred';
    
    if (error instanceof Error) {
      errorMessage = error.message;
      errorLog = error.stack || error.message;
    } else if (typeof error === 'string') {
      errorLog = error;
    } else {
      errorLog = JSON.stringify(error, null, 2);
    }
    
    return NextResponse.redirect(new URL(`/error?message=${encodeURIComponent(errorMessage)}&errorLog=${encodeURIComponent(errorLog)}`, request.url));
  }
}
