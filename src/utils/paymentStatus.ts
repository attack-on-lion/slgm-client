// 실제로는 데이터베이스나 캐시에서 상태를 확인해야 합니다
// 여기서는 간단한 예시로 구현합니다
const paymentStatus = new Map<string, { status: string; timestamp: number }>();

export function getPaymentStatus(code: string) {
  const status = paymentStatus.get(code);
  
  if (!status) {
    return { status: 'pending' };
  }

  // 5분 이상 지난 상태는 제거
  if (Date.now() - status.timestamp > 5 * 60 * 1000) {
    paymentStatus.delete(code);
    return { status: 'pending' };
  }

  return { status: status.status };
}

export function updatePaymentStatus(code: string, status: string) {
  paymentStatus.set(code, { status, timestamp: Date.now() });
}
