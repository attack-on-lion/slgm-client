import { NextRequest, NextResponse } from 'next/server';
import { getPaymentStatus } from '@/utils/paymentStatus';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    if (!code) {
      return NextResponse.json({ error: '코드가 필요합니다.' }, { status: 400 });
    }

    const status = getPaymentStatus(code);
    return NextResponse.json(status);
  } catch (error) {
    console.error('결제 상태 확인 실패:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
