"use client";

import React, { useState, useEffect } from "react";
import paymentApi from "@/services/api/payment";
import { WeeklyExpenseResponse, MonthlyTop3Response, MonthlyComparisonResponse } from "@/interfaces/Payment";

export default function AnalysisPage() {
  const [selectedMonth, setSelectedMonth] = useState(8);
  const [weeklyData, setWeeklyData] = useState<WeeklyExpenseResponse | null>(null);
  const [top3Data, setTop3Data] = useState<MonthlyTop3Response | null>(null);
  const [monthlyComparisonData, setMonthlyComparisonData] = useState<MonthlyComparisonResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [monthlyScore, setMonthlyScore] = useState<number>(84);
  
  // 월별 점수 데이터
  const monthlyScores = {
    1: 72, 2: 68, 3: 75, 4: 82, 5: 78, 6: 85,
    7: 88, 8: 84, 9: 79, 10: 73, 11: 76, 12: 81
  };
  
  // API 데이터 조회
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [weeklyResponse, top3Response, comparisonResponse] = await Promise.all([
          paymentApi.getWeeklyExpenses(1),
          paymentApi.getMonthlyTop3(1),
          paymentApi.getMonthlyComparison(1, selectedMonth)
        ]);
        
        setWeeklyData(weeklyResponse);
        setTop3Data(top3Response);
        setMonthlyComparisonData(comparisonResponse);
        
        // 선택된 월에 따른 점수 설정
        const score = monthlyScores[selectedMonth as keyof typeof monthlyScores] || 84;
        setMonthlyScore(score);
      } catch (error) {
        console.error('데이터 조회 실패:', error);
        const score = monthlyScores[selectedMonth as keyof typeof monthlyScores] || 84;
        setMonthlyScore(score);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedMonth]);
  
  const getTopExpenses = () => {
    if (!top3Data) return [];
    
    return top3Data.topCategories.map((category, index) => ({
      category: category.categoryName,
      amount: category.amount,
      percentage: category.percentage,
      color: ['#57DFC7', '#FF715B', '#FAD200'][index]
    }));
  };

  const topExpenses = getTopExpenses();

  const changeMonth = (direction: 'prev' | 'next') => {
    setSelectedMonth(prev => {
      const newMonth = direction === 'prev' 
        ? prev === 1 ? 12 : prev - 1
        : prev === 12 ? 1 : prev + 1;
      
      // 월 변경 시 점수도 함께 업데이트
      const score = monthlyScores[newMonth as keyof typeof monthlyScores] || 84;
      setMonthlyScore(score);
      
      return newMonth;
    });
  };

  const getGaugeRotation = (percentage: number) => {
    return Math.max(0, Math.min(100, percentage)) / 100 * 180;
  };

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
              <span className="text-[14px] text-slate-600">투철한 절약러</span>
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
            
            <div className="space-y-4">
              {topExpenses.map((expense, index) => (
                <div key={expense.category}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[14px] text-slate-700">{expense.category}</span>
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
          </div>
        </section>

        {/* 전월 대비 차트 */}
        <section className="mb-6">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <h2 className="text-[18px] font-bold text-slate-800 mb-4">전월 대비 더 썼어요</h2>
            
            {loading ? (
              <div className="flex items-center justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#42D2B8]"></div>
              </div>
            ) : (monthlyComparisonData?.items?.length || 0) > 0 ? (
              <div className="flex items-end justify-between h-32">
                {monthlyComparisonData?.items?.map((category, index) => {
                  const maxAmount = Math.max(...(monthlyComparisonData?.items?.map(c => c.totalCurrent) || []));
                  const currentHeight = (category.totalCurrent / maxAmount) * 100;
                  const previousHeight = (category.totalPrevious / maxAmount) * 100;
                  
                  return (
                    <div key={category.rank} className="flex flex-col items-center">
                      <div className="flex items-end gap-1 mb-2">
                        <div className="w-3 bg-[#C9FFF5] rounded-t" style={{ height: `${previousHeight}px` }}></div>
                        <div className="w-3 bg-[#42D2B8] rounded-t" style={{ height: `${currentHeight}px` }}></div>
                      </div>
                      <span className="text-[12px] text-slate-600">{category.categoryName}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-4 text-slate-500">
                <p>전월 비교 데이터가 없습니다.</p>
              </div>
            )}
          </div>
        </section>

        {/* 일별 평균 소비상황 */}
        <section className="mb-8">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <h2 className="text-[18px] font-bold text-slate-800 mb-4">일별 평균 소비상황</h2>
            
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#42D2B8]"></div>
              </div>
            ) : weeklyData?.days ? (
              <div className="h-48 relative">
                {/* 차트 영역 */}
                <div className="h-40 relative mb-2">
                  {/* 데이터 포인트와 연결선 */}
                  <div className="absolute inset-0 flex items-end">
                    {weeklyData.days.map((day, index) => {
                      const maxExpense = Math.max(...weeklyData.days.map(d => d.totalExpense));
                      const height = maxExpense > 0 ? (day.totalExpense / maxExpense) * 100 : 0;
                      const leftPosition = (index / (weeklyData.days.length - 1)) * 80 + 10;
                      
                      return (
                        <div 
                          key={index} 
                          className="absolute flex flex-col items-center"
                          style={{ left: `${leftPosition}%`, transform: 'translateX(-50%)' }}
                        >
                          {/* 데이터 포인트 (점) */}
                          <div 
                            className="w-2 h-2 rounded-full border border-white shadow-sm bg-[#42D2B8]"
                            style={{ marginBottom: `${height}%` }}
                          ></div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                {/* 요일 라벨 */}
                <div className="flex">
                  {weeklyData.days.map((day, index) => {
                    const leftPosition = (index / (weeklyData.days.length - 1)) * 80 + 10;
                    
                    return (
                      <span
                        key={index}
                        className="text-[12px] text-center text-slate-600 absolute font-medium"
                        style={{ left: `${leftPosition}%`, transform: 'translateX(-50%)' }}
                      >
                        {day.dayOfWeekKo}
                      </span>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500">
                <p>일별 평균 소비 데이터가 없습니다</p>
              </div>
            )}
          </div>
        </section>

        {/* 유료 플랜 버튼 */}
        <section className="mb-20">
          <button className="w-full bg-[#42D2B8] text-white py-4 rounded-2xl text-[16px] font-semibold hover:bg-[#3BC4A8] active:scale-95 transition-all">
            유료 플랜 보러가기
          </button>
        </section>
      </main>
    </div>
  );
} 