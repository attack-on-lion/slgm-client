"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ReportsPage() {
  const router = useRouter();
  
  // 필터 상태
  const [startDate, setStartDate] = useState("2025-02-05");
  const [endDate, setEndDate] = useState("2025-08-05");
  const [transactionType, setTransactionType] = useState("전체");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  
  // 샘플 결제내역 데이터 (더 많은 데이터 추가)
  const paymentHistory = [
    {
      id: 1,
      store: "맥도날드",
      time: "15:12",
      category: "식비",
      amount: 12000,
      date: "2025-08-05",
      type: "출금"
    },
    {
      id: 2,
      store: "스타벅스",
      time: "14:30",
      category: "카페, 간식",
      amount: 6500,
      date: "2025-08-05",
      type: "출금"
    },
    {
      id: 3,
      store: "올리브영",
      time: "13:45",
      category: "쇼핑",
      amount: 25000,
      date: "2025-08-05",
      type: "출금"
    },
    {
      id: 4,
      store: "교보문고",
      time: "12:20",
      category: "취미, 여가",
      amount: 18000,
      date: "2025-08-04",
      type: "출금"
    },
    {
      id: 5,
      store: "편의점",
      time: "11:15",
      category: "기타",
      amount: 3500,
      date: "2025-08-04",
      type: "출금"
    },
    {
      id: 6,
      store: "치킨집",
      time: "20:30",
      category: "식비",
      amount: 22000,
      date: "2025-08-03",
      type: "출금"
    },
    {
      id: 7,
      store: "영화관",
      time: "19:00",
      category: "취미, 여가",
      amount: 14000,
      date: "2025-08-03",
      type: "출금"
    },
    {
      id: 8,
      store: "약국",
      time: "16:45",
      category: "의료, 건강",
      amount: 8000,
      date: "2025-08-02",
      type: "출금"
    },
    {
      id: 9,
      store: "급여",
      time: "09:00",
      category: "입금",
      amount: 500000,
      date: "2025-08-01",
      type: "입금"
    },
    {
      id: 10,
      store: "용돈",
      time: "14:00",
      category: "입금",
      amount: 100000,
      date: "2025-08-01",
      type: "입금"
    }
  ];

  const handleClose = () => {
    router.back();
  };

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.type-dropdown')) {
        setShowTypeDropdown(false);
      }
      if (!target.closest('.category-dropdown')) {
        setShowCategoryDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 필터링된 결제내역
  const filteredPayments = paymentHistory.filter(payment => {
    const paymentDate = new Date(payment.date);
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // 날짜 범위 필터
    if (paymentDate < start || paymentDate > end) return false;
    
    // 거래 유형 필터
    if (transactionType !== "전체" && payment.type !== transactionType) return false;
    
    // 카테고리 필터
    if (selectedCategory !== "전체" && payment.category !== selectedCategory) return false;
    
    return true;
  });

  // 날짜별로 그룹화
  const groupedPayments = filteredPayments.reduce((groups, payment) => {
    const date = payment.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(payment);
    return groups;
  }, {} as Record<string, typeof filteredPayments>);

  // 날짜 포맷팅
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return "오늘";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "어제";
    } else {
      return date.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' });
    }
  };

  // 총 사용 금액 계산
  const totalAmount = filteredPayments
    .filter(payment => payment.type === "출금")
    .reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <div className="min-h-screen bg-[#F5F6F8]">
      {/* 헤더 */}
      <header className="bg-white px-5 py-4 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <button
            onClick={handleClose}
            className="text-[18px] text-slate-800 hover:text-slate-600 transition-colors"
          >
            &lt;
          </button>
          <h1 className="text-[18px] font-bold text-slate-800 flex-1 text-center">결제 내역</h1>
          <div className="w-6"></div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="px-5 py-6">
        {/* 총 사용 금액 */}
        <section className="mb-6">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <h2 className="text-[16px] font-medium text-slate-600 mb-2">8월 사용 금액</h2>
            <p className="text-[28px] font-bold text-slate-800">{totalAmount.toLocaleString()} 원</p>
          </div>
        </section>

        {/* 필터 섹션 */}
        <section className="mb-6">
          {/* 날짜 범위 선택 */}
          <div className="flex items-center gap-3 mb-4">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-xl text-[14px] text-slate-800"
            />
            <span className="text-slate-400">~</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-xl text-[14px] text-slate-800"
            />
          </div>

          {/* 드롭다운 필터 */}
          <div className="flex gap-3">
            {/* 거래 유형 필터 */}
            <div className="flex-1 relative type-dropdown">
              <button
                onClick={() => setShowTypeDropdown(!showTypeDropdown)}
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-[14px] text-slate-800 flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <span>{transactionType}</span>
                <svg 
                  className={`w-4 h-4 transition-transform ${showTypeDropdown ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showTypeDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-lg z-10">
                  <div className="p-2 space-y-1">
                    {["전체", "입금", "출금"].map((type) => (
                      <button
                        key={type}
                        onClick={() => {
                          setTransactionType(type);
                          setShowTypeDropdown(false);
                        }}
                        className={`
                          w-full text-left px-3 py-2 rounded-lg text-[14px] transition-all duration-200
                          ${transactionType === type
                            ? "bg-[#42D2B8] text-white"
                            : "text-slate-700 hover:bg-slate-50 hover:text-slate-800"
                          }
                        `}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 카테고리 필터 */}
            <div className="flex-1 relative category-dropdown">
              <button
                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-[14px] text-slate-800 flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <span>{selectedCategory}</span>
                <svg 
                  className={`w-4 h-4 transition-transform ${showCategoryDropdown ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showCategoryDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-lg z-10 max-h-64 overflow-y-auto">
                  <div className="p-2 space-y-1">
                    {["전체", "식비", "카페, 간식", "쇼핑", "취미, 여가", "의료, 건강", "술, 유흥", "주거, 통신", "입금"].map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          setSelectedCategory(category);
                          setShowCategoryDropdown(false);
                        }}
                        className={`
                          w-full text-left px-3 py-2 rounded-lg text-[14px] transition-all duration-200
                          ${selectedCategory === category
                            ? "bg-[#42D2B8] text-white"
                            : "text-slate-700 hover:bg-slate-50 hover:text-slate-800"
                          }
                        `}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 결제 내역 목록 */}
        <section>
          {Object.entries(groupedPayments).length > 0 ? (
            Object.entries(groupedPayments).map(([date, payments]) => (
              <div key={date} className="mb-6">
                <h3 className="text-[16px] font-semibold text-slate-700 mb-3 px-1">
                  {formatDate(date)}
                </h3>
                
                <div className="space-y-3">
                  {payments.map((payment) => (
                    <div key={payment.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
                      <div className="flex items-center justify-between">
                        {/* 왼쪽: 가맹점명과 시간 */}
                        <div>
                          <p className="text-[16px] font-bold text-slate-800">{payment.store}</p>
                          <p className="text-[14px] text-slate-500 mt-1">{payment.time}</p>
                        </div>
                        
                        {/* 오른쪽: 카테고리와 금액 */}
                        <div className="text-right">
                          <p className="text-[14px] text-[#42B6A1]">{payment.category}</p>
                          <p className={`text-[16px] font-bold mt-1 ${
                            payment.type === "입금" ? "text-[#10B981]" : "text-slate-800"
                          }`}>
                            {payment.type === "입금" ? "+" : "-"}{payment.amount.toLocaleString()}원
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-500 text-[16px]">해당 조건의 결제내역이 없습니다.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}