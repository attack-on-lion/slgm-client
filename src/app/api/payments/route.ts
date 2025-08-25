import { NextRequest, NextResponse } from "next/server";
import { updatePaymentStatus } from "./status/route";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, gifticonId } = body;

    if (!code || !gifticonId) {
      return NextResponse.json({ error: '필수 정보가 누락되었습니다.' }, { status: 400 });
    }

    // 실제로는 여기서 결제 처리를 해야 합니다
    // 예: 기프티콘 사용 처리, 데이터베이스 업데이트 등
    
    // 결제 완료 시 상태 업데이트
    updatePaymentStatus(code, 'completed');

    return NextResponse.json({
      message: "Payment successful",
      code,
      gifticonId
    });
  } catch (error) {
    console.error('결제 처리 실패:', error);
    return NextResponse.json({ error: '결제 처리에 실패했습니다.' }, { status: 500 });
  }
}