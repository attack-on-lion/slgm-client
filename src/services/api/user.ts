import { UserCreateRequest, UserCreateResponse, UserProfile, UserError } from "@/interfaces/User";

const API_BASE_URL = "https://api.slgmslgm.com";

// 더미 유저 데이터 (백엔드 연결 테스트를 위해 주석처리)
// const DUMMY_USER_PROFILE: UserProfile = {
//   user_id: 1,
//   name: "홍길동",
//   age: 25,
//   profileImgUrl: "/squirrel.svg",
//   location: "서울시 노원구",
//   gender: "남",
//   email: "honggil@gmail.com",
//   phoneNumber: "010-1234-5678",
//   categoryName: "식비",
//   point: 150,
//   baseAmount: 200000,
//   createdAt: "2025-01-15",
//   updatedAt: "2025-01-15T08:10:06.64074"
// };

export const userApi = {
  async createUser(userData: UserCreateRequest): Promise<UserCreateResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        if (response.status === 400) {
          const errorData: UserError = await response.json();
          throw new Error(errorData.errorMessage);
        }
        throw new Error('유저 정보 추가에 실패했습니다.');
      }

      return await response.json() as UserCreateResponse;
    } catch (error) {
      console.error('유저 정보 추가 실패:', error);
      throw error;
    }
  },

  async getUserProfile(userId: string): Promise<UserProfile> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          const errorData: UserError = await response.json();
          throw new Error(errorData.errorMessage);
        }
        throw new Error('유저 정보 조회에 실패했습니다.');
      }

      return await response.json() as UserProfile;
    } catch (error) {
      console.error('유저 정보 조회 실패:', error);
      // CORS 문제 해결 전까지 임시 더미 데이터 반환
      return {
        user_id: 1,
        name: "홍길동",
        age: 25,
        profileImgUrl: "/squirrel.svg",
        location: "서울시 노원구",
        gender: "남",
        email: "honggil@gmail.com",
        phoneNumber: "010-1234-5678",
        categoryName: "식비",
        point: 150,
        baseAmount: 200000,
        createdAt: "2025-01-15",
        updatedAt: "2025-01-15T08:10:06.64074"
      };
    }
  },
};
