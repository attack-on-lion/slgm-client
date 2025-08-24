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
        throw new Error('메인 페이지 데이터 조회에 실패했습니다.');
      }

      return await response.json() as MainPageData;
    } catch (error) {
      console.error('메인 페이지 데이터 조회 실패:', error);
      // CORS 문제 해결 전까지 더미 데이터 반환
      return DUMMY_MAIN_PAGE_DATA;
    }
  },
};
