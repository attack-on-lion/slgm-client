"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ChallengeSetupPage() {
  const router = useRouter();
  const [challengeType, setChallengeType] = useState<"안쓰기" | "적게쓰기" | "모으기">("안쓰기");
  const [duration, setDuration] = useState<"3일" | "7일" | "14일" | "30일">("3일");
  const [scope, setScope] = useState<"카테고리 선택" | "전체 결제 내역">("전체 결제 내역");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleClose = () => {
    router.back();
  };

  const handleStartChallenge = () => {
    // 챌린지 시작 로직
    console.log("챌린지 시작:", { challengeType, duration, scope, selectedCategory });
    // 여기에 실제 챌린지 시작 API 호출 등을 추가할 수 있습니다
    router.push("/challenge");
  };

  const toggleCategoryDropdown = () => {
    setShowCategoryDropdown(!showCategoryDropdown);
  };

  const toggleDetailModal = () => {
    setShowDetailModal(!showDetailModal);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setScope("카테고리 선택");
    setShowCategoryDropdown(false); // 선택 후 드롭다운 닫기
  };

  // 상세정보 모달 자동 숨김 (5초 후)
  useEffect(() => {
    if (showDetailModal) {
      const timer = setTimeout(() => {
        setShowDetailModal(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showDetailModal]);

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.category-dropdown')) {
        setShowCategoryDropdown(false);
      }
    };

    if (showCategoryDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showCategoryDropdown]);

  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <header className="bg-white px-5 py-4 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <button 
            onClick={handleClose}
            className="text-[18px] text-slate-800 hover:text-slate-600 transition-colors"
          >
            &lt;
          </button>
          <h1 className="text-[18px] font-bold text-slate-800">챌린지</h1>
          <div className="w-6"></div>
        </div>
      </header>

      {/* 환영 메시지 */}
      <section className="px-5 py-6">
        <h2 className="text-[20px] font-bold text-slate-800 mb-2">안녕하세요 000님!</h2>
        <p className="text-[16px] text-slate-700">챌린지 시작해볼까요?</p>
      </section>

      {/* 챌린지 설정 박스 */}
      <section className="px-5">
        <div className="border-2 border-[#E0F2FE] rounded-2xl p-6 bg-white">
          {/* 챌린지 유형 선택 */}
          <div className="mb-6">
            <h3 className="text-[16px] font-bold text-slate-800 mb-4">챌린지 유형을 선택해주세요.</h3>
            <div className="flex gap-3">
              <button
                onClick={() => setChallengeType("안쓰기")}
                className={`
                  flex-1 py-3 px-4 rounded-xl text-[14px] font-medium transition-all whitespace-nowrap
                  ${challengeType === "안쓰기"
                    ? "bg-[#42D2B8] text-white"
                    : "bg-white border border-slate-300 text-slate-600 hover:bg-slate-50"
                  }
                `}
              >
                안쓰기
              </button>
              <button
                onClick={() => setChallengeType("적게쓰기")}
                className={`
                  flex-1 py-3 px-4 rounded-xl text-[14px] font-medium transition-all whitespace-nowrap
                  ${challengeType === "적게쓰기"
                    ? "bg-[#42D2B8] text-white"
                    : "bg-white border border-slate-300 text-slate-600 hover:bg-slate-50"
                  }
                `}
              >
                적게쓰기
              </button>
              <button
                onClick={() => setChallengeType("모으기")}
                className={`
                  flex-1 py-3 px-4 rounded-xl text-[14px] font-medium transition-all whitespace-nowrap
                  ${challengeType === "모으기"
                    ? "bg-[#42D2B8] text-white"
                    : "bg-white border border-slate-300 text-slate-600 hover:bg-slate-50"
                  }
                `}
              >
                모으기
              </button>
            </div>
          </div>

          {/* 챌린지 진행 기간 선택 */}
          <div className="mb-6">
            <h3 className="text-[16px] font-bold text-slate-800 mb-4">챌린지 진행 기간을 선택해주세요.</h3>
            <div className="flex gap-3">
              <button
                onClick={() => setDuration("3일")}
                className={`
                  flex-1 py-3 px-4 rounded-xl text-[14px] font-medium transition-all whitespace-nowrap
                  ${duration === "3일"
                    ? "bg-[#42D2B8] text-white border border-[#42D2B8]"
                    : "bg-white border border-slate-300 text-slate-600 hover:bg-slate-50"
                  }
                `}
              >
                3일
              </button>
              <button
                onClick={() => setDuration("7일")}
                className={`
                  flex-1 py-3 px-4 rounded-xl text-[14px] font-medium transition-all whitespace-nowrap
                  ${duration === "7일"
                    ? "bg-[#42D2B8] text-white border border-[#42D2B8]"
                    : "bg-white border border-slate-300 text-slate-600 hover:bg-slate-50"
                  }
                `}
              >
                7일
              </button>
              <button
                onClick={() => setDuration("14일")}
                className={`
                  flex-1 py-3 px-4 rounded-xl text-[14px] font-medium transition-all whitespace-nowrap
                  ${duration === "14일"
                    ? "bg-[#42D2B8] text-white border border-[#42D2B8]"
                    : "bg-white border border-slate-300 text-slate-600 hover:bg-slate-50"
                  }
                `}
              >
                14일
              </button>
              <button
                onClick={() => setDuration("30일")}
                className={`
                  flex-1 py-3 px-4 rounded-xl text-[14px] font-medium transition-all whitespace-nowrap
                  ${duration === "30일"
                    ? "bg-[#42D2B8] text-white border border-[#42D2B8]"
                    : "bg-white border border-slate-300 text-slate-600 hover:bg-slate-50"
                  }
                `}
              >
                30일
              </button>
            </div>
          </div>

          {/* 챌린지 범위 선택 */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[16px] font-bold text-slate-800">챌린지 범위를 선택해주세요.</h3>
              <button 
                onClick={toggleDetailModal}
                className="flex items-center gap-1 text-[12px] text-slate-500 hover:text-slate-700 transition-colors"
              >
                <span>상세정보</span>
                <span className="text-[14px]">ⓘ</span>
              </button>
            </div>
            <div className="flex gap-3">
              <div className="flex-1 relative category-dropdown">
                <button
                  onClick={toggleCategoryDropdown}
                  className={`
                    w-full py-3 px-4 rounded-xl text-[14px] font-medium transition-all border whitespace-nowrap text-left flex items-center justify-between
                    ${scope === "카테고리 선택"
                      ? "bg-[#42D2B8] text-white border-[#42D2B8]"
                      : "bg-white border-slate-300 text-slate-600 hover:bg-slate-50"
                    }
                  `}
                >
                  <span>
                    {selectedCategory || "카테고리 선택"}
                  </span>
                  <svg 
                    className={`w-4 h-4 transition-transform ${showCategoryDropdown ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* 카테고리 드롭다운 */}
                {showCategoryDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-lg z-10 max-h-64 overflow-y-auto">
                    <div className="p-3 space-y-1">
                                             {[
                         "전체", "식비", "카페, 간식", "쇼핑", "취미, 여가", 
                         "의료, 건강", "술, 유흥", "주거, 통신"
                       ].map((category) => (
                        <button
                          key={category}
                          onClick={() => handleCategorySelect(category)}
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
              
              <button
                onClick={() => setScope("전체 결제 내역")}
                className={`
                  flex-1 py-3 px-4 rounded-xl text-[14px] font-medium transition-all border whitespace-nowrap
                  ${scope === "전체 결제 내역"
                    ? "bg-[#42D2B8] text-white border-[#42D2B8]"
                    : "bg-white border-slate-300 text-slate-600 hover:bg-slate-50"
                  }
                `}
              >
                전체 결제 내역
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 챌린지 시작하기 버튼 */}
      <section className="px-5 mt-8 pb-8">
        <button
          onClick={handleStartChallenge}
          className="w-full bg-[#42D2B8] text-white py-4 rounded-2xl text-[16px] font-semibold hover:bg-[#3BC4A8] active:scale-95 transition-all"
        >
          챌린지 시작하기
        </button>
      </section>

      {/* 상세정보 모달 */}
      {showDetailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-5">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full animate-in slide-in-from-bottom-4 duration-300">
            <div className="bg-[#F8FAFC] rounded-xl p-4">
              <ul className="space-y-3 text-[14px] text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#42D2B8] mt-1">•</span>
                  <span>카테고리 선택 시, 지정된 카테고리 소비 내역만 챌린지에 포함됩니다.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#42D2B8] mt-1">•</span>
                  <span>전체 결제 내역 선택 시, 사용자가 결제하는 모든 내역이 챌린지에 포함됩니다.</span>
                </li>
              </ul>
            </div>
            <div className="mt-4 text-center">
              <button
                onClick={toggleDetailModal}
                className="text-[14px] text-slate-500 hover:text-slate-700 transition-colors"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
