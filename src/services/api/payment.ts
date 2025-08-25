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

// 결제내역 추가
async function createPayment(userId: number, data: PaymentCreateRequest) {
  try {
    const response = await api.post(`/payments/${userId}`, data);
    return response.data;
  } catch (error) {
    console.error('결제내역 추가 실패:', error);
    throw error;
  }
}

// 결제내역 조회
async function getPayments(userId: number, params: PaymentQueryParams): Promise<PaymentListResponse> {
  try {
    const queryParams = new URLSearchParams();
    
    if (params.from) queryParams.append('from', params.from);
    if (params.to) queryParams.append('to', params.to);
    if (params.page !== undefined) queryParams.append('page', params.page.toString());
    if (params.size !== undefined) queryParams.append('size', params.size.toString());
    if (params.category && params.category !== "전체") queryParams.append('category', params.category);
    
    const response = await api.get(`/payments/${userId}?${queryParams.toString()}`);
    return response.data as PaymentListResponse;
  } catch (error) {
    console.error('결제내역 조회 실패:', error);
    throw error;
  }
}

// 주간 소비량 조회
async function getWeeklyExpenses(userId: number): Promise<WeeklyExpenseResponse> {
  try {
    const response = await api.get(`/payments/${userId}/weekly`);
    return response.data as WeeklyExpenseResponse;
  } catch (error) {
    console.error('주간 소비량 조회 실패:', error);
    throw error;
  }
}

// 월간 TOP3 카테고리 조회
async function getMonthlyTop3(userId: number): Promise<MonthlyTop3Response> {
  try {
    const response = await api.get(`/payments/${userId}/monthly/top3`);
    return response.data as MonthlyTop3Response;
  } catch (error) {
    console.error('월간 TOP3 조회 실패:', error);
    throw error;
  }
}

// 전월 대비 지출 상승폭 top4 조회
async function getMonthlyComparison(userId: number, selectedMonth: number): Promise<MonthlyComparisonResponse> {
  try {
    const response = await api.get(`/payments/${userId}/monthly/comparison?month=${selectedMonth}`);
    return response.data as MonthlyComparisonResponse;
  } catch (error) {
    console.error('전월 대비 비교 조회 실패:', error);
    throw error;
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
