import { NextRequest, NextResponse } from 'next/server';

// 실제로는 데이터베이스나 캐시에서 상태를 확인해야 합니다
// 여기서는 간단한 예시로 구현합니다
const paymentStatus = new Map<string, { status: string; timestamp: number }>();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    if (!code) {
      return NextResponse.json({ error: '코드가 필요합니다.' }, { status: 400 });
    }

    // 실제로는 데이터베이스에서 상태를 확인해야 합니다
    const status = paymentStatus.get(code);
    
    if (!status) {
      return NextResponse.json({ status: 'pending' });
    }

    // 5분 이상 지난 상태는 제거
    if (Date.now() - status.timestamp > 5 * 60 * 1000) {
      paymentStatus.delete(code);
      return NextResponse.json({ status: 'pending' });
    }

    return NextResponse.json({ status: status.status });
  } catch (error) {
    console.error('결제 상태 확인 실패:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}

// 결제 완료 시 상태를 업데이트하는 함수 (다른 API에서 호출)
export function updatePaymentStatus(code: string, status: string) {
  paymentStatus.set(code, { status, timestamp: Date.now() });
}
