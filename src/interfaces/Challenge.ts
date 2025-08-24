// 챌린지 관련 타입 정의
export type ChallengeType = 'pay_not' | 'pay_less' | 'pay_save';

// 유효 챌린지 응답
export interface ActiveChallenge {
  id: number;
  challenge_name: string;
  challengeType: ChallengeType;
  startAt: string;
  endAt: string;
  remainingDays: number;
}

// 완료된 챌린지 응답
export interface CompletedChallenge {
  id: number;
  challenge_name: string;
  challengeType: ChallengeType;
  startDate: string;
  endDate: string;
}

// 챌린지 생성 요청
export interface ChallengeCreateRequest {
  user_id: string;
  challengeName: string;
  challengeType: ChallengeType;
  challengeDays: number;
  startAt: string;
  endAt: string;
  createdAt: string;
  categories: string[];
}

// 챌린지 생성 응답
export interface ChallengeCreateResponse {
  id: number;
  user_id: string;
  challengeName: string;
  challengeType: ChallengeType;
  challengeDays: number;
  startAt: string;
  endAt: string;
  createdAt: string;
  categories: string[];
  characterImageUrl: string;
  isCompleted: boolean;
  isDeleted: boolean;
}

// 추천 챌린지 생성 요청
export interface RecommendationCreateRequest {
  user_id: string;
  pays: Array<{
    transactionAt: string;
    category: string;
  }>;
}

// 추천 챌린지 응답
export interface Recommendation {
  id: number;
  challengeName: string;
  challengeType: ChallengeType;
  challengeDays: number;
  createdAt: string;
  categories: string | string[];
  points?: number;
  description?: string;
}

// 추천 챌린지 생성 응답
export interface RecommendationCreateResponse {
  user_id: string;
  recommendations: Recommendation[];
}

// 특정 챌린지 조회 응답
export interface ChallengeDetail {
  id: number;
  challenge_name: string;
  type: ChallengeType;
  startDate: string;
  endDate: string;
  createdAt: string;
  categories: string[];
}
