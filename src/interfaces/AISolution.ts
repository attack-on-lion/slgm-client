// AI 솔루션 관련 타입 정의

// AI 점수 응답
export interface AIScoreResponse {
  key: string;
  value: string;
}

// AI 간단 솔루션 응답
export interface AISimpleSolutionResponse {
  message: string;
  solution: string[];
}

// AI 비교 솔루션 응답
export interface AIComparisonSolutionResponse {
  message: string;
  solution: string[];
}

// AI 솔루션 에러 응답
export interface AISolutionErrorResponse {
  msg: string;
}
