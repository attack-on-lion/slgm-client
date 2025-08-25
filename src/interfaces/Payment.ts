// 결제내역 관련 타입 정의
export type PaymentDirection = 'OUTFLOW' | 'INFLOW' | 'INTERNAL';
export type PaymentMethod = 'CARD' | 'CASH' | 'TRANSFER';

// 결제내역 생성 요청
export interface PaymentCreateRequest {
  transactionAt: string;
  storeName: string;
  amount: number;
  direction: PaymentDirection;
  method: PaymentMethod;
  category: string;
}

// 카테고리 정보
export interface Category {
  id: number;
  name: string;
}

// 결제내역 아이템
export interface PaymentItem {
  id: number;
  transactionAt: string;
  storeName: string;
  amount: number;
  direction: PaymentDirection;
  method: PaymentMethod;
  category: Category;
}

// 결제내역 조회 요청 파라미터
export interface PaymentQueryParams {
  from: string;
  to: string;
  page: number;
  size?: number;
  category?: string;
}

// 결제내역 요약 정보
export interface PaymentSummary {
  period: {
    from: string;
    to: string;
  };
  totalExpense: number;
  totalIncome: number;
  count: number;
}

// 페이지 정보
export interface PageInfo {
  page: number;
  size: number;
  hasNext: boolean;
}

// 결제내역 조회 응답
export interface PaymentListResponse {
  summary: PaymentSummary;
  pageInfo: PageInfo;
  items: PaymentItem[];
}

// 주간 소비 데이터
export interface WeeklyExpenseDay {
  date: string;
  dayOfWeekKo: string;
  totalExpense: number;
  transactionCount: number;
}

// 주간 소비 응답
export interface WeeklyExpenseResponse {
  userId: number;
  from: string;
  to: string;
  days: WeeklyExpenseDay[];
}

// 월간 TOP3 카테고리
export interface TopCategory {
  rank: number;
  categoryName: string;
  amount: number;
  transactionCount: number;
  percentage: number;
}

// 월간 TOP3 응답
export interface MonthlyTop3Response {
  userId: number;
  from: string;
  to: string;
  totalExpense: number;
  topCategories: TopCategory[];
}

// 전월 대비 지출 상승폭 카테고리
export interface MonthlyComparisonCategory {
  rank: number;
  categoryId: number;
  categoryName: string;
  totalCurrent: number;
  totalPrevious: number;
}

// 전월 대비 지출 상승폭 top4 응답
export interface MonthlyComparisonResponse {
  userId: number;
  currentMonth: string;
  previousMonth: string;
  items: MonthlyComparisonCategory[];
}
