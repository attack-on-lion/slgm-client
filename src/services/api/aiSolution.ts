import http from "./config";
import {
  AIScoreResponse,
  AISimpleSolutionResponse,
  AIComparisonSolutionResponse,
  AISolutionErrorResponse
} from "@/interfaces/AISolution";

const api = http.api();

// AI 점수 조회
async function getAIScore(userId: number): Promise<AIScoreResponse> {
  try {
    const response = await api.post(`/users/${userId}/ai/score`);
    return response.data as AIScoreResponse;
  } catch (error) {
    console.error('AI 점수 조회 실패:', error);
    throw error;
  }
}

// AI 간단 솔루션 조회
async function getAISimpleSolution(userId: number): Promise<AISimpleSolutionResponse> {
  try {
    const response = await api.post(`/users/${userId}/ai/simple-solution`);
    return response.data as AISimpleSolutionResponse;
  } catch (error) {
    console.error('AI 간단 솔루션 조회 실패:', error);
    throw error;
  }
}

// AI 비교 솔루션 조회
async function getAIComparisonSolution(userId: number): Promise<AIComparisonSolutionResponse> {
  try {
    const response = await api.post(`/users/${userId}/ai/comparison-solution`);
    return response.data as AIComparisonSolutionResponse;
  } catch (error) {
    console.error('AI 비교 솔루션 조회 실패:', error);
    throw error;
  }
}

const aiSolutionApi = {
  getAIScore,
  getAISimpleSolution,
  getAIComparisonSolution
};

export default aiSolutionApi;
