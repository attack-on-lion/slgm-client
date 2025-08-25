import { MainPageData } from "@/interfaces/MainPage";

const API_BASE_URL = "https://api.slgmslgm.com";

// 더미 데이터 (CORS 문제 해결 전까지 사용)
const DUMMY_MAIN_PAGE_DATA: MainPageData = {
  availableAmount: 150000,
  challengeDday: 7,
  points: 250,
  balance: 450000,
  monthlyDecreaseRate: 12.5,
  budgetConsumptionRate: 65.3,
  totalBudget: 500000,
  monthlyExpense: 326500
};

export const mainPageApi = {
  async getMainPageData(): Promise<MainPageData> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/mainpage`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.warn('메인 페이지 API 응답이 성공적이지 않습니다. 더미 데이터를 사용합니다.');
        return DUMMY_MAIN_PAGE_DATA;
      }

      const data = await response.json() as MainPageData;
      
      // 데이터 유효성 검사
      if (!data || typeof data !== 'object') {
        console.warn('메인 페이지 API 응답 데이터가 유효하지 않습니다. 더미 데이터를 사용합니다.');
        return DUMMY_MAIN_PAGE_DATA;
      }

      return data;
    } catch (error) {
      console.warn('메인 페이지 데이터 조회 중 오류가 발생했습니다. 더미 데이터를 사용합니다:', error);
      // 네트워크 오류나 기타 예외 상황에서도 더미 데이터 반환
      return DUMMY_MAIN_PAGE_DATA;
    }
  },
};
