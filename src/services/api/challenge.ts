import http from "./config";
import {
  ActiveChallenge,
  CompletedChallenge,
  ChallengeCreateRequest,
  ChallengeCreateResponse,
  RecommendationCreateRequest,
  RecommendationCreateResponse,
  ChallengeDetail
} from "@/interfaces/Challenge";

const api = http.api();

// 더미 데이터 (백엔드 연결 테스트를 위해 주석처리)
// const DUMMY_ACTIVE_CHALLENGE: ActiveChallenge = {
//   id: 1,
//   challenge_name: "식비 절약 챌린지",
//   challengeType: "pay_less",
//   startAt: "2025-01-15",
//   endAt: "2025-02-15",
//   remainingDays: 15
// };

const DUMMY_COMPLETED_CHALLENGES: CompletedChallenge[] = [
  {
    id: 2,
    challenge_name: "카페 안가기 챌린지",
    challengeType: "pay_not",
    startDate: "2024-12-01",
    endDate: "2024-12-31"
  },
  {
    id: 3,
    challenge_name: "쇼핑 절약 챌린지",
    challengeType: "pay_less",
    startDate: "2024-11-01",
    endDate: "2024-11-30"
  },
  {
    id: 4,
    challenge_name: "저축 챌린지",
    challengeType: "pay_save",
    startDate: "2024-10-01",
    endDate: "2024-10-31"
  }
];

const DUMMY_RECOMMENDATIONS = [
  {
    id: 1,
    challengeName: "카테고리 줄이기",
    challengeType: "pay_less" as const,
    challengeDays: 7,
    createdAt: "2025-01-20",
    categories: "식비",
    points: 1800,
    description: "7일 동안 식비 관련 소비를 줄입니다."
  },
  {
    id: 2,
    challengeName: "카테고리 줄이기",
    challengeType: "pay_not" as const,
    challengeDays: 3,
    createdAt: "2025-01-20",
    categories: ["의류", "쇼핑"],
    points: 1500,
    description: "3일 동안 의류 관련 소비를 하지 않습니다."
  },
  {
    id: 3,
    challengeName: "카테고리 줄이기",
    challengeType: "pay_less" as const,
    challengeDays: 14,
    createdAt: "2025-01-20",
    categories: "카페",
    points: 2400,
    description: "14일 동안 카페 관련 소비를 줄입니다."
  }
];

// 시작 가능한 모든 챌린지들 (맨 밑 그리드용)
const DUMMY_AVAILABLE_CHALLENGES = [
  {
    id: 4,
    challengeName: "카테고리 줄이기",
    challengeType: "pay_not" as const,
    challengeDays: 3,
    points: 1500,
    categories: ["의류"],
    description: "3일 동안 의류 관련 소비를 하지 않습니다."
  },
  {
    id: 5,
    challengeName: "카테고리 줄이기",
    challengeType: "pay_less" as const,
    challengeDays: 7,
    points: 1800,
    categories: ["식비"],
    description: "7일 동안 식비 관련 소비를 줄입니다."
  },
  {
    id: 6,
    challengeName: "카테고리 줄이기",
    challengeType: "pay_not" as const,
    challengeDays: 3,
    points: 1500,
    categories: ["카페"],
    description: "3일 동안 카페 관련 소비를 하지 않습니다."
  },
  {
    id: 7,
    challengeName: "카테고리 줄이기",
    challengeType: "pay_less" as const,
    challengeDays: 14,
    points: 2400,
    categories: ["쇼핑"],
    description: "14일 동안 쇼핑 관련 소비를 줄입니다."
  },
  {
    id: 8,
    challengeName: "카테고리 줄이기",
    challengeType: "pay_save" as const,
    challengeDays: 30,
    points: 3000,
    categories: ["저축"],
    description: "30일 동안 저축을 목표로 합니다."
  },
  {
    id: 9,
    challengeName: "카테고리 줄이기",
    challengeType: "pay_not" as const,
    challengeDays: 3,
    points: 1500,
    categories: ["외식"],
    description: "3일 동안 외식 관련 소비를 하지 않습니다."
  }
];

// 유효 챌린지 조회
async function getActiveChallenge(): Promise<ActiveChallenge> {
  try {
    const response = await api.get<ActiveChallenge>('/challenges/active');
    return response.data;
  } catch (error) {
    console.error('활성 챌린지 조회 실패:', error);
    throw error;
  }
}

// 완료된 챌린지 조회
async function getCompletedChallenges(): Promise<CompletedChallenge[]> {
  try {
    const response = await api.get<CompletedChallenge[]>('/challenges/completed');
    return response.data;
  } catch (error) {
    console.error('완료된 챌린지 조회 실패:', error);
    throw error;
  }
}

// 챌린지 생성
async function createChallenge(data: ChallengeCreateRequest): Promise<ChallengeCreateResponse> {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const endDate = new Date(data.startAt);
  endDate.setDate(endDate.getDate() + data.challengeDays);
  
  return {
    id: Math.floor(Math.random() * 1000) + 1,
    user_id: data.user_id,
    challengeName: data.challengeName,
    challengeType: data.challengeType,
    challengeDays: data.challengeDays,
    startAt: data.startAt,
    endAt: endDate.toISOString().split('T')[0],
    createdAt: data.createdAt,
    categories: data.categories,
    characterImageUrl: "https://example.com/character.png",
    isCompleted: false,
    isDeleted: false
  };
}

// 추천 챌린지 생성
async function createRecommendations(data: RecommendationCreateRequest): Promise<RecommendationCreateResponse> {
    const response = await api.post<RecommendationCreateRequest, RecommendationCreateResponse>('/challenges/recommendations', data);
    return response.data;
}

// 추천 챌린지 전체 조회
async function getRecommendations(): Promise<any> {
  await new Promise(resolve => setTimeout(resolve, 500));
  return DUMMY_RECOMMENDATIONS[0];
}

// 특정 일수 추천 챌린지 조회
async function getRecommendationsByDays(days: number): Promise<any> {
  await new Promise(resolve => setTimeout(resolve, 500));
  return DUMMY_RECOMMENDATIONS.find(rec => rec.challengeDays === days) || DUMMY_RECOMMENDATIONS[0];
}

// 특정 추천 챌린지 조회
async function getRecommendationById(id: number): Promise<any> {
  await new Promise(resolve => setTimeout(resolve, 500));
  return DUMMY_RECOMMENDATIONS.find(rec => rec.id === id);
}

// 특정 챌린지 조회
async function getChallengeById(id: number): Promise<ChallengeDetail> {
  await new Promise(resolve => setTimeout(resolve, 500));
  return {
    id: id,
    challenge_name: "식비 절약 챌린지",
    type: "pay_less",
    startDate: "2025-01-15",
    endDate: "2025-02-15",
    createdAt: "2025-01-15",
    categories: ["식비", "카페"]
  };
}

// 시작 가능한 모든 챌린지 조회
async function getAvailableChallenges(): Promise<any[]> {
  try {
    const response = await api.get<any[]>('/challenges/available');
    return response.data;
  } catch (error) {
    console.error('시작 가능한 챌린지 조회 실패:', error);
    throw error;
  }
}

// 챌린지 삭제
async function deleteChallenge(id: number): Promise<{ msg: string }> {
  await new Promise(resolve => setTimeout(resolve, 600));
  return { msg: "챌린지를 성공적으로 삭제했습니다." };
}

const challengeApi = {
  getActiveChallenge,
  getCompletedChallenges,
  createChallenge,
  createRecommendations,
  getRecommendations,
  getRecommendationsByDays,
  getRecommendationById,
  getChallengeById,
  deleteChallenge,
  getAvailableChallenges
};

export default challengeApi;
