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
    // 기프티콘 사용 처리 API 호출 (서버로 직접 전달)
    const response = await fetch(`${request.nextUrl.origin}/api/server/users/${userId}/gifticons/${gifticonId}/use`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API 호출 실패: ${response.status} - ${errorData.error || response.statusText}`);
    }
    
    // 성공 응답
    return NextResponse.json({ 
      message: "QR 스캔 성공", 
      code, 
      gifticonId, 
      userId 
    });
  } catch (error) {
    console.error('QR 스캔 처리 실패:', error);
    return NextResponse.json({ error: 'QR 스캔 처리에 실패했습니다.' }, { status: 500 });
  }
}
