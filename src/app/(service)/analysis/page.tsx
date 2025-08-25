"use client";

import React, { useState, useEffect, useMemo } from "react";
import paymentApi from "@/services/api/payment";
import aiSolutionApi from "@/services/api/aiSolution";
import { WeeklyExpenseResponse, MonthlyTop3Response, MonthlyComparisonResponse } from "@/interfaces/Payment";
import { AISimpleSolutionResponse, AIComparisonSolutionResponse } from "@/interfaces/AISolution";
import useSign from "@/hooks/useSign";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const getCategoryKorean = (category: string): string => {
  const categoryMap: { [key: string]: string } = {
    'CAFE': '카페',
    'FOOD': '음식점',
    'TRANSPORTATION': '교통',
    'SALARY': '입금',
    'UTILITY': '통신',
    'SHOPPING': '쇼핑',
    'EDUCATION': '교육',
    'OTHERS': '기타',
    'ENTERTAINMENT': '유흥',
    'cafe': '카페',
    'food': '음식점',
    'transportation': '교통',
    'salary': '입금',
    'utility': '통신',
    'shopping': '쇼핑',
    'education': '교육',
    'others': '기타',
    'entertainment': '유흥'
  };
  
  return categoryMap[category] || category;
};

export default function AnalysisPage() {
  const { userId, isAuthenticated } = useSign();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [weeklyData, setWeeklyData] = useState<WeeklyExpenseResponse | null>(null);
  const [top3Data, setTop3Data] = useState<MonthlyTop3Response | null>(null);
  const [monthlyComparisonData, setMonthlyComparisonData] = useState<MonthlyComparisonResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [monthlyScore, setMonthlyScore] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  
  const [aiSimpleSolution, setAiSimpleSolution] = useState<AISimpleSolutionResponse | null>(null);
  const [aiComparisonSolution, setAiComparisonSolution] = useState<AIComparisonSolutionResponse | null>(null);
  const [aiLoading, setAiLoading] = useState(true);
  
  const [aiSimpleOpen, setAiSimpleOpen] = useState(false);
  const [aiComparisonOpen, setAiComparisonOpen] = useState(false);
  const [aiDailyOpen, setAiDailyOpen] = useState(false);
  
  useEffect(() => {
    if (!isAuthenticated || !userId) {
      setError('로그인이 필요합니다.');
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [weeklyResponse, top3Response, comparisonResponse] = await Promise.all([
          paymentApi.getWeeklyExpenses(userId, selectedMonth),
          paymentApi.getMonthlyTop3(userId, selectedMonth),
          paymentApi.getMonthlyComparison(userId, selectedMonth)
        ]);
        
        console.log('=== API 호출 결과 ===');
        console.log('선택된 월:', selectedMonth);
        console.log('API 응답 데이터:', {
          selectedMonth,
          weeklyData: weeklyResponse,
          top3Data: top3Response,
          comparisonData: comparisonResponse
        });
        
        if (weeklyResponse) {
          console.log('주간 데이터 상세:', {
            days: weeklyResponse.days,
            daysLength: weeklyResponse.days?.length,
            firstDay: weeklyResponse.days?.[0],
            allDays: weeklyResponse.days?.map(d => ({
              date: d.date,
              dayOfWeekKo: d.dayOfWeekKo,
              totalExpense: d.totalExpense,
              transactionCount: d.transactionCount
            }))
          });
        }
        
        setWeeklyData(weeklyResponse);
        setTop3Data(top3Response);
        setMonthlyComparisonData(comparisonResponse);
        
        try {
          const [simpleSolution, comparisonSolution] = await Promise.all([
            aiSolutionApi.getAISimpleSolution(userId),
            aiSolutionApi.getAIComparisonSolution(userId)
          ]);
          
          setAiSimpleSolution(simpleSolution);
          setAiComparisonSolution(comparisonSolution);
        } catch (aiError) {
          console.error('AI 솔루션 조회 실패:', aiError);
        } finally {
          setAiLoading(false);
        }
        
        if (top3Response && top3Response.totalExpense > 0) {
          let score = 100;
          
          if (top3Response.totalExpense > 1000000) {
            score -= 30;
          } else if (top3Response.totalExpense > 500000) {
            score -= 20;
          } else if (top3Response.totalExpense > 300000) {
            score -= 10;
          }
          
          if (top3Response.topCategories && top3Response.topCategories.length > 0) {
            const avgPercentage = top3Response.topCategories.reduce((sum, cat) => sum + cat.percentage, 0) / top3Response.topCategories.length;
            if (avgPercentage > 50) {
              score -= 15;
            }
          }
          
          score = Math.max(0, Math.min(100, score));
          setMonthlyScore(Math.round(score));
        } else {
          setMonthlyScore(80);
        }
      } catch (error) {
        console.error('데이터 조회 실패:', error);
        setError('데이터를 불러오는데 실패했습니다.');
        setMonthlyScore(80);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedMonth, userId, isAuthenticated]);
  
  const getTopExpenses = () => {
    if (!top3Data || !top3Data.topCategories) return [];
    
    return top3Data.topCategories.map((category, index) => ({
      category: category.categoryName,
      amount: category.amount,
      percentage: category.percentage,
      color: ['#57DFC7', '#FF715B', '#FAD200'][index] || '#42D2B8'
    }));
  };

  const topExpenses = getTopExpenses();

  const chartData = useMemo(() => {
    if (!weeklyData?.days || weeklyData.days.length === 0) {
      console.log('주간 데이터 없음:', weeklyData);
      return [];
    }
    
    console.log('주간 데이터 원본:', weeklyData.days);
    
    const weekDays = ['월', '화', '수', '목', '금', '토', '일'];
    const data = weekDays.map(day => {
      const existingDay = weeklyData.days.find(d => d.dayOfWeekKo === day);
      console.log(`${day}요일 데이터 찾기:`, {
        찾는요일: day,
        찾은데이터: existingDay,
        전체데이터: weeklyData.days?.map(d => `${d.dayOfWeekKo}: ${d.totalExpense}원`)
      });
      
      if (existingDay) {
        const result = {
          name: day,
          소비액: existingDay.totalExpense || 0,
          거래횟수: existingDay.transactionCount || 0,
          isWeekend: day === '토' || day === '일'
        };
        console.log(`${day}요일 결과:`, result);
        return result;
      } else {
        // API에 해당 요일 데이터가 없으면 0으로 표시
        const result = {
          name: day,
          소비액: 0,
          거래횟수: 0,
          isWeekend: day === '토' || day === '일'
        };
        console.log(`${day}요일 결과 (데이터 없음):`, result);
        return result;
      }
    });
    
    console.log('생성된 차트 데이터:', data);
    return data;
  }, [weeklyData]);

  const comparisonChartData = useMemo(() => {
    if (!monthlyComparisonData?.items || monthlyComparisonData.items.length === 0) return [];
    
    const maxCategories = 4;
    const items = [...monthlyComparisonData.items];
    
    while (items.length < maxCategories) {
      const dummyIndex = items.length;
      const categories = ['CAFE', 'FOOD', 'TRANSPORTATION', 'SHOPPING', 'EDUCATION', 'ENTERTAINMENT', 'UTILITY', 'OTHERS'];
      const randomCategory = categories[dummyIndex % categories.length];
      items.push({
        rank: dummyIndex + 1,
        categoryId: 999 + dummyIndex,
        categoryName: randomCategory,
        totalCurrent: 0,
        totalPrevious: 0
      });
    }
    
    return items.slice(0, maxCategories);
  }, [monthlyComparisonData]);

  const changeMonth = (direction: 'prev' | 'next') => {
    console.log('월 변경 시작:', { direction, 현재월: selectedMonth });
    
    setSelectedMonth(prev => {
      const newMonth = direction === 'prev' 
        ? prev === 1 ? 12 : prev - 1
        : prev === 12 ? 1 : prev + 1;
      
      console.log('새로운 월 설정:', { 이전월: prev, 새로운월: newMonth });
      return newMonth;
    });
  };

  const getGaugeRotation = (percentage: number) => {
    return Math.max(0, Math.min(100, percentage)) / 100 * 180;
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F5F6F8] flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 mb-4">로그인이 필요합니다.</p>
          <button 
            onClick={() => window.location.href = '/sign-in'} 
            className="bg-[#42D2B8] text-white px-4 py-2 rounded-lg hover:bg-[#3BC4A8]"
          >
            로그인하기
          </button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F5F6F8] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-[#42D2B8] text-white px-4 py-2 rounded-lg hover:bg-[#3BC4A8]"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F6F8]">
      <main className="px-5 py-6">
        <section className="mb-6">
          <h1 className="text-[20px] font-bold text-slate-800 text-center mb-6">소비 패턴 분석</h1>
          
          <div className="relative mb-6">
            <div className="w-48 h-24 mx-auto relative">
              <svg width="192" height="120" viewBox="0 0 220 120" className="w-full h-full">
                <path d="M 35 95 A 75 75 0 0 1 185 95" fill="none" stroke="#FFF7E8" strokeWidth="16" strokeLinecap="round" />
                <path
                  d="M 35 95 A 75 75 0 0 1 185 95"
                  fill="none"
                  stroke="#FFCD71"
                  strokeWidth="16"
                  strokeLinecap="round"
                  strokeDasharray="235.6"
                  strokeDashoffset={235.6 - (getGaugeRotation(monthlyScore) / 180) * 235.6}
                  style={{ transition: 'stroke-dashoffset 0.7s ease-out' }}
                />
              </svg>
              
              <div className="absolute inset-0 flex items-end justify-center" style={{ paddingBottom: '4px' }}>
                <span className="text-[32px] font-bold text-slate-800">{monthlyScore}</span>
              </div>
            </div>
            
            <div className="text-center mt-2 mb-4">
              <span className="text-[14px] text-slate-600">
                {monthlyScore >= 80 ? '투철한 절약러' : 
                 monthlyScore >= 60 ? '절약 중인 사람' : 
                 monthlyScore >= 40 ? '보통 수준' : '절약이 필요해요'}
              </span>
            </div>

            <div className="flex items-center justify-center gap-6">
              <button onClick={() => changeMonth('prev')} className="text-[18px] text-slate-600 hover:text-slate-800 p-2">
                &lt;
              </button>
              <span className="text-[18px] font-semibold text-slate-800 min-w-[60px] text-center">
                {selectedMonth}월
              </span>
              <button onClick={() => changeMonth('next')} className="text-[18px] text-slate-600 hover:text-slate-800 p-2">
                &gt;
              </button>
            </div>
          </div>
        </section>

        <section className="mb-6">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <h2 className="text-[18px] font-bold text-slate-800 mb-4">지출 Top 3</h2>
            
            {loading ? (
              <div className="flex items-center justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#42D2B8]"></div>
              </div>
            ) : topExpenses.length > 0 ? (
              <div className="space-y-4">
                {topExpenses.map((expense, index) => (
                  <div key={expense.category}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[14px] text-slate-700">{getCategoryKorean(expense.category)}</span>
                      <span className="text-[14px] font-semibold text-slate-800">{expense.percentage}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-500 ease-out" 
                        style={{ 
                          width: `${expense.percentage}%`,
                          backgroundColor: expense.color
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-slate-500">
                <p>지출 데이터가 없습니다.</p>
              </div>
            )}
          </div>
        </section>

        <section className="mb-6">
          <div className="bg-white rounded-2xl p-4 border border-[#42D2B8] shadow-sm">
            <div 
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setAiSimpleOpen(!aiSimpleOpen)}
            >
              <h3 className="text-[16px] font-semibold text-[#006D6F]">AI 솔루션</h3>
              <svg 
                className={`w-5 h-5 text-[#42D2B8] transform transition-transform duration-200 ${
                  aiSimpleOpen ? 'rotate-180' : ''
                }`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {aiSimpleOpen && (
              <div className="mt-3 text-[14px] text-[#006D6F] border-t border-[#42D2B8] pt-3">
                {aiLoading ? (
                  <div className="animate-pulse">
                    <div className="h-4 bg-[#42D2B8] rounded mb-2 opacity-30"></div>
                    <div className="h-4 bg-[#42D2B8] rounded opacity-30"></div>
                  </div>
                ) : aiSimpleSolution ? (
                  <div>
                    <p className="mb-2 font-medium">{aiSimpleSolution.message}</p>
                    {aiSimpleSolution.solution.map((solution, index) => (
                      <p key={index} className="mb-1">• {solution}</p>
                    ))}
                  </div>
                ) : (
                  <div>
                    <p>• 지출이 많은 카테고리 분석을 통해 절약 포인트 제안</p>
                    <p>• 개인 맞춤형 절약 팁과 대안 소비 방법 제시</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        <section className="mb-6">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <h2 className="text-[18px] font-bold text-slate-800 mb-4">전월 대비 더 썼어요</h2>
            
            {loading ? (
              <div className="flex items-center justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#42D2B8]"></div>
              </div>
            ) : comparisonChartData.length > 0 ? (
              <div className="w-full overflow-x-auto">
                <div className="flex items-end justify-center gap-4 h-32 min-w-max px-4">
                  {comparisonChartData.map((category, index) => {
                    try {
                      const validItems = comparisonChartData.filter(item => 
                        typeof item.totalCurrent === 'number' && 
                        typeof item.totalPrevious === 'number' &&
                        !isNaN(item.totalCurrent) && 
                        !isNaN(item.totalPrevious) &&
                        item.totalCurrent >= 0 && 
                        item.totalPrevious >= 0
                      );
                      
                      if (validItems.length === 0) {
                        return (
                          <div key={category.rank} className="flex flex-col items-center flex-shrink-0">
                            <div className="w-3 h-4 bg-gray-300 rounded-t mb-2"></div>
                            <span className="text-[12px] text-slate-600 text-center max-w-[60px] break-words">
                              {getCategoryKorean(category.categoryName)}
                            </span>
                          </div>
                        );
                      }
                      
                      const maxAmount = Math.max(...validItems.map(c => c.totalCurrent));
                      const currentHeight = maxAmount > 0 ? (category.totalCurrent / maxAmount) * 100 : 0;
                      const previousHeight = maxAmount > 0 ? (category.totalPrevious / maxAmount) * 100 : 0;
                      
                      return (
                        <div key={category.rank} className="flex flex-col items-center flex-shrink-0">
                          <div className="flex items-end gap-1 mb-2">
                            <div className="w-3 bg-[#C9FFF5] rounded-t" style={{ height: `${previousHeight}px` }}></div>
                            <div className="w-3 bg-[#42D2B8] rounded-t" style={{ height: `${currentHeight}px` }}></div>
                          </div>
                          <span className="text-[12px] text-slate-600 text-center max-w-[60px] break-words">
                            {getCategoryKorean(category.categoryName)}
                          </span>
                        </div>
                      );
                    } catch (error) {
                      console.error('차트 데이터 처리 오류:', error);
                      return (
                        <div key={category.rank} className="flex flex-col items-center flex-shrink-0">
                          <div className="w-3 h-4 bg-gray-300 rounded-t mb-2"></div>
                          <span className="text-[12px] text-slate-600 text-center max-w-[60px] break-words">
                            {getCategoryKorean(category.categoryName)}
                          </span>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            ) : (
              <div className="text-center py-4 text-slate-500">
                <p>전월 비교 데이터가 없습니다.</p>
              </div>
            )}
          </div>
        </section>

        <section className="mb-6">
          <div className="bg-white rounded-2xl p-4 border border-[#42D2B8] shadow-sm">
            <div 
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setAiComparisonOpen(!aiComparisonOpen)}
            >
              <h3 className="text-[16px] font-semibold text-[#006D6F]">AI 솔루션</h3>
              <svg 
                className={`w-5 h-5 text-[#42D2B8] transform transition-transform duration-200 ${
                  aiComparisonOpen ? 'rotate-180' : ''
                }`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {aiComparisonOpen && (
              <div className="mt-3 text-[14px] text-[#006D6F] border-t border-[#42D2B8] pt-3">
                {aiLoading ? (
                  <div className="animate-pulse">
                    <div className="h-4 bg-[#42D2B8] rounded mb-2 opacity-30"></div>
                    <div className="h-4 bg-[#42D2B8] rounded opacity-30"></div>
                  </div>
                ) : aiComparisonSolution ? (
                  <div>
                    <p className="mb-2 font-medium">{aiComparisonSolution.message}</p>
                    {aiComparisonSolution.solution.map((solution, index) => (
                      <p key={index} className="mb-1">• {solution}</p>
                    ))}
                  </div>
                ) : (
                  <div>
                    <p>• 전월 대비 지출 증가 패턴 분석</p>
                    <p>• 소비 습관 개선을 위한 맞춤형 조언 제공</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        <section className="mb-8">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <h2 className="text-[18px] font-bold text-slate-800 mb-4">일별 평균 소비상황</h2>
            
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#42D2B8]"></div>
              </div>
            ) : chartData.length > 0 ? (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={chartData}
                    margin={{
                      top: 20,
                      right: 10,
                      left: 0,
                      bottom: 20,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="name" 
                      stroke="#64748b"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tick={({ x, y, payload }) => {
                        const color = payload.value === '토' ? '#3B82F6' : 
                                    payload.value === '일' ? '#EF4444' : '#64748b';
                        return (
                          <g transform={`translate(${x},${y})`}>
                            <text x={0} y={0} dy={16} textAnchor="middle" fill={color} fontSize={12} fontWeight="600">
                              {payload.value}
                            </text>
                          </g>
                        );
                      }}
                    />
                    <YAxis 
                      stroke="#64748b"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e2e8f0',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                      formatter={(value, name) => [
                        `${Number(value).toLocaleString()}원`, 
                        name === '소비액' ? '소비액' : '거래횟수'
                      ]}
                      labelStyle={{ color: '#475569', fontWeight: '600' }}
                    />
                    <Area
                      type="monotone"
                      dataKey="소비액"
                      stroke="#42D2B8"
                      strokeWidth={3}
                      fill="#42D2B8"
                      fillOpacity={0.2}
                      dot={{
                        fill: '#42D2B8',
                        strokeWidth: 2,
                        stroke: 'white',
                        r: 4
                      }}
                      activeDot={{
                        r: 6,
                        stroke: '#42D2B8',
                        strokeWidth: 2,
                        fill: 'white'
                      }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500">
                <p className="mb-2">일별 평균 소비 데이터가 없습니다</p>
                <p className="text-[12px] text-slate-400">해당 월의 소비 내역이 없거나 데이터를 불러올 수 없습니다.</p>
              </div>
            )}
          </div>
        </section>

        <section className="mb-6">
          <div className="bg-white rounded-2xl p-4 border border-[#42D2B8] shadow-sm">
            <div 
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setAiDailyOpen(!aiDailyOpen)}
            >
              <h3 className="text-[16px] font-semibold text-[#006D6F]">AI 솔루션</h3>
              <svg 
                className={`w-5 h-5 text-[#42D2B8] transform transition-transform duration-200 ${
                  aiDailyOpen ? 'rotate-180' : ''
                }`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {aiDailyOpen && (
              <div className="mt-3 text-[14px] text-[#006D6F] border-t border-[#42D2B8] pt-3">
                {aiLoading ? (
                  <div className="animate-pulse">
                    <div className="h-4 bg-[#42D2B8] rounded mb-2 opacity-30"></div>
                    <div className="h-4 bg-[#42D2B8] rounded opacity-30"></div>
                  </div>
                ) : (
                  <div>
                    <p>• 요일별 소비 패턴 분석 및 최적 소비 시기 제안</p>
                    <p>• 주말 소비 관리 전략과 평일 절약 방법 안내</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        <section className="mb-20">
          <button className="w-full bg-[#42D2B8] text-white py-4 rounded-2xl text-[16px] font-semibold hover:bg-[#3BC4A8] active:scale-95 transition-all">
            유료 플랜 보러가기
          </button>
        </section>
      </main>
    </div>
  );
} 