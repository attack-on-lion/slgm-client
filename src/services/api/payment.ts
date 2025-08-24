import http from "./config";
import {
  PaymentCreateRequest,
  PaymentListResponse,
  PaymentQueryParams,
  WeeklyExpenseResponse,
  MonthlyTop3Response,
  MonthlyComparisonResponse
} from "@/interfaces/Payment";

const api = http.api();

// 더미 데이터
const DUMMY_PAYMENTS: PaymentListResponse = {
  summary: {
    period: {
      from: "2025-01-01",
      to: "2025-01-31"
    },
    totalExpense: 1250000,
    totalIncome: 3000000,
    count: 47
  },
  pageInfo: {
    page: 0,
    size: 15,
    hasNext: true
  },
  items: [
    {
      id: 1,
      transactionAt: "2025-01-15T15:12:00",
      storeName: "맥도날드",
      amount: 12000,
      direction: "OUTFLOW",
      method: "CARD",
      category: { id: 1, name: "식비" }
    },
    {
      id: 2,
      transactionAt: "2025-01-15T14:30:00",
      storeName: "스타벅스",
      amount: 6500,
      direction: "OUTFLOW",
      method: "CARD",
      category: { id: 2, name: "카페" }
    },
    {
      id: 3,
      transactionAt: "2025-01-15T13:45:00",
      storeName: "올리브영",
      amount: 25000,
      direction: "OUTFLOW",
      method: "CARD",
      category: { id: 3, name: "쇼핑" }
    },
    {
      id: 4,
      transactionAt: "2025-01-14T18:20:00",
      storeName: "교보문고",
      amount: 18000,
      direction: "OUTFLOW",
      method: "CARD",
      category: { id: 4, name: "여가" }
    },
    {
      id: 5,
      transactionAt: "2025-01-14T12:15:00",
      storeName: "편의점",
      amount: 3500,
      direction: "OUTFLOW",
      method: "CARD",
      category: { id: 5, name: "기타" }
    },
    {
      id: 6,
      transactionAt: "2025-01-13T20:30:00",
      storeName: "치킨집",
      amount: 22000,
      direction: "OUTFLOW",
      method: "CARD",
      category: { id: 1, name: "식비" }
    },
    {
      id: 7,
      transactionAt: "2025-01-13T19:00:00",
      storeName: "영화관",
      amount: 14000,
      direction: "OUTFLOW",
      method: "CARD",
      category: { id: 4, name: "여가" }
    },
    {
      id: 8,
      transactionAt: "2025-01-12T16:45:00",
      storeName: "약국",
      amount: 8000,
      direction: "OUTFLOW",
      method: "CARD",
      category: { id: 6, name: "의료" }
    },
    {
      id: 9,
      transactionAt: "2025-01-10T09:00:00",
      storeName: "급여",
      amount: 3000000,
      direction: "INFLOW",
      method: "TRANSFER",
      category: { id: 7, name: "급여" }
    },
    {
      id: 10,
      transactionAt: "2025-01-09T21:30:00",
      storeName: "마트",
      amount: 45000,
      direction: "OUTFLOW",
      method: "CARD",
      category: { id: 1, name: "식비" }
    }
  ]
};

const DUMMY_WEEKLY: WeeklyExpenseResponse = {
  userId: 1,
  from: "2025-01-13",
  to: "2025-01-19",
  days: [
    { date: "2025-01-13", dayOfWeekKo: "월", totalExpense: 24000, transactionCount: 2 },
    { date: "2025-01-14", dayOfWeekKo: "화", totalExpense: 72000, transactionCount: 6 },
    { date: "2025-01-15", dayOfWeekKo: "수", totalExpense: 43500, transactionCount: 3 },
    { date: "2025-01-16", dayOfWeekKo: "목", totalExpense: 18000, transactionCount: 1 },
    { date: "2025-01-17", dayOfWeekKo: "금", totalExpense: 56000, transactionCount: 4 },
    { date: "2025-01-18", dayOfWeekKo: "토", totalExpense: 32000, transactionCount: 2 },
    { date: "2025-01-19", dayOfWeekKo: "일", totalExpense: 15000, transactionCount: 1 }
  ]
};

const DUMMY_TOP3: MonthlyTop3Response = {
  userId: 1,
  from: "2025-01-01",
  to: "2025-01-31",
  totalExpense: 1250000,
  topCategories: [
    {
      rank: 1,
      categoryName: "식비",
      amount: 480000,
      transactionCount: 15,
      percentage: 38.4
    },
    {
      rank: 2,
      categoryName: "여가",
      amount: 320000,
      transactionCount: 8,
      percentage: 25.6
    },
    {
      rank: 3,
      categoryName: "쇼핑",
      amount: 250000,
      transactionCount: 6,
      percentage: 20.0
    }
  ]
};

// 전월 대비 지출 상승폭 top4 더미 데이터
const DUMMY_MONTHLY_COMPARISON: MonthlyComparisonResponse = {
  userId: 1,
  currentMonth: "2025-01",
  previousMonth: "2024-12",
  topCategories: [
    {
      rank: 1,
      categoryName: "식비",
      currentMonthAmount: 480000,
      previousMonthAmount: 320000,
      increaseAmount: 160000,
      increasePercentage: 50.0
    },
    {
      rank: 2,
      categoryName: "여가",
      currentMonthAmount: 320000,
      previousMonthAmount: 280000,
      increaseAmount: 40000,
      increasePercentage: 14.3
    },
    {
      rank: 3,
      categoryName: "쇼핑",
      currentMonthAmount: 250000,
      previousMonthAmount: 180000,
      increaseAmount: 70000,
      increasePercentage: 38.9
    },
    {
      rank: 4,
      categoryName: "카페",
      currentMonthAmount: 180000,
      previousMonthAmount: 150000,
      increaseAmount: 30000,
      increasePercentage: 20.0
    }
  ]
};

// 결제내역 추가 (더미 데이터 사용)
async function createPayment(userId: number, data: PaymentCreateRequest) {
  // 더미 응답 시뮬레이션
  await new Promise(resolve => setTimeout(resolve, 500));
  return { success: true, message: "결제내역이 추가되었습니다." };
}

// 결제내역 조회 (더미 데이터 사용)
async function getPayments(userId: number, params: PaymentQueryParams): Promise<PaymentListResponse> {
  // API 호출 시뮬레이션
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // 카테고리 필터링 적용
  let filteredItems = DUMMY_PAYMENTS.items;
  if (params.category && params.category !== "전체") {
    filteredItems = DUMMY_PAYMENTS.items.filter(item => 
      item.category.name === params.category
    );
  }
  
  return {
    ...DUMMY_PAYMENTS,
    items: filteredItems,
    summary: {
      ...DUMMY_PAYMENTS.summary,
      period: {
        from: params.from,
        to: params.to
      }
    }
  };
}

// 주간 소비량 조회 (더미 데이터 사용)
async function getWeeklyExpenses(userId: number): Promise<WeeklyExpenseResponse> {
  try {
    // API 호출 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 600));
    return DUMMY_WEEKLY;
  } catch (error) {
    console.error('주간 소비량 조회 실패:', error);
    return DUMMY_WEEKLY;
  }
}

// 월간 TOP3 카테고리 조회 (더미 데이터 사용)
async function getMonthlyTop3(userId: number): Promise<MonthlyTop3Response> {
  try {
    // API 호출 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 700));
    return DUMMY_TOP3;
  } catch (error) {
    console.error('월간 TOP3 조회 실패:', error);
    return DUMMY_TOP3;
  }
}

// 전월 대비 지출 상승폭 top4 조회 (더미 데이터 사용)
async function getMonthlyComparison(userId: number, selectedMonth: number): Promise<MonthlyComparisonResponse> {
  try {
    // API 호출 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // 선택한 월에 따라 전월 비교 데이터 생성
    const currentMonth = selectedMonth;
    const previousMonth = selectedMonth > 1 ? selectedMonth - 1 : 12;
    
    // 월별로 다른 더미 데이터 생성 (실제로는 API에서 가져올 데이터)
    const monthlyData: Record<number, any[]> = {
      8: [
        { rank: 1, categoryName: "식비", currentMonthAmount: 520000, previousMonthAmount: 380000, increaseAmount: 140000, increasePercentage: 36.8 },
        { rank: 2, categoryName: "여가", currentMonthAmount: 350000, previousMonthAmount: 280000, increaseAmount: 70000, increasePercentage: 25.0 },
        { rank: 3, categoryName: "쇼핑", currentMonthAmount: 280000, previousMonthAmount: 200000, increaseAmount: 80000, increasePercentage: 40.0 },
        { rank: 4, categoryName: "카페", currentMonthAmount: 200000, previousMonthAmount: 150000, increaseAmount: 50000, increasePercentage: 33.3 }
      ],
      7: [
        { rank: 1, categoryName: "식비", currentMonthAmount: 380000, previousMonthAmount: 420000, increaseAmount: -40000, increasePercentage: -9.5 },
        { rank: 2, categoryName: "여가", currentMonthAmount: 280000, previousMonthAmount: 320000, increaseAmount: -40000, increasePercentage: -12.5 },
        { rank: 3, categoryName: "쇼핑", currentMonthAmount: 200000, previousMonthAmount: 250000, increaseAmount: -50000, increasePercentage: -20.0 },
        { rank: 4, categoryName: "카페", currentMonthAmount: 150000, previousMonthAmount: 180000, increaseAmount: -30000, increasePercentage: -16.7 }
      ],
      9: [
        { rank: 1, categoryName: "식비", currentMonthAmount: 480000, previousMonthAmount: 520000, increaseAmount: -40000, increasePercentage: -7.7 },
        { rank: 2, categoryName: "여가", currentMonthAmount: 320000, previousMonthAmount: 350000, increaseAmount: -30000, increasePercentage: -8.6 },
        { rank: 3, categoryName: "쇼핑", currentMonthAmount: 250000, previousMonthAmount: 280000, increaseAmount: -30000, increasePercentage: -10.7 },
        { rank: 4, categoryName: "카페", currentMonthAmount: 180000, previousMonthAmount: 200000, increaseAmount: -20000, increasePercentage: -10.0 }
      ]
    };
    
    const monthData = monthlyData[selectedMonth] || DUMMY_MONTHLY_COMPARISON.topCategories;
    
    return {
      userId: 1,
      currentMonth: `${new Date().getFullYear()}-${String(currentMonth).padStart(2, '0')}`,
      previousMonth: `${new Date().getFullYear()}-${String(previousMonth).padStart(2, '0')}`,
      topCategories: monthData
    };
  } catch (error) {
    console.error('전월 대비 비교 조회 실패:', error);
    return {
      userId: 1,
      currentMonth: `${new Date().getFullYear()}-${String(selectedMonth).padStart(2, '0')}`,
      previousMonth: `${new Date().getFullYear()}-${String(selectedMonth > 1 ? selectedMonth - 1 : 12).padStart(2, '0')}`,
      topCategories: DUMMY_MONTHLY_COMPARISON.topCategories
    };
  }
}

const paymentApi = {
  createPayment,
  getPayments,
  getWeeklyExpenses,
  getMonthlyTop3,
  getMonthlyComparison
};

export default paymentApi;
