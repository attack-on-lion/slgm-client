export interface MainPageData {
  // 사용 가능 금액
  availableAmount: number;
  
  // 진행중인 챌린지 D-Day
  challengeDday: number;
  
  // 보유중인 포인트
  points: number;
  
  // 잔액
  balance: number;
  
  // 전월 대비 감소율 (%)
  monthlyDecreaseRate: number;
  
  // 월 예산 소비율 (%)
  budgetConsumptionRate: number;
  
  // 월 총 예산
  totalBudget: number;
  
  // 월 소비 금액
  monthlyExpense: number;
}
