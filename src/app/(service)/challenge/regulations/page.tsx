"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function ChallengeRegulationsPage() {
  const router = useRouter();
  const [agreement, setAgreement] = useState<"agree" | "disagree" | null>(null);

  const handleClose = () => {
    router.back();
  };

  const handleNext = () => {
    if (agreement === "agree") {
      router.push("/challenge/setup");
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F6F8]">
      {/* 헤더 */}
      <header className="bg-white px-5 py-4 border-b border-slate-100">
        <div className="flex items-center justify-between">
          <button 
            onClick={handleClose}
            className="text-[18px] text-slate-800 hover:text-slate-600 transition-colors"
          >
            &lt;
          </button>
          <h1 className="text-[18px] font-bold text-slate-800">챌린지 규정 안내</h1>
          <div className="w-6"></div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="px-5 py-6">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-[20px] font-bold text-slate-800 mb-6">챌린지 규정 안내</h2>

          {/* 보증금 제도 */}
          <section className="mb-6">
            <h3 className="text-[16px] font-bold text-slate-800 mb-3">보증금 제도</h3>
            <ul className="space-y-2 text-[14px] text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-[#42D2B8] mt-1">•</span>
                <span>챌린지는 시작 전 보증금을 받습니다.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#42D2B8] mt-1">•</span>
                <span>챌린지 실패 시, 보증금은 환불되지 않습니다.</span>
              </li>
            </ul>
          </section>

          {/* 실패 기준 */}
          <section className="mb-6">
            <h3 className="text-[16px] font-bold text-slate-800 mb-3">실패 기준</h3>
            <ul className="space-y-2 text-[14px] text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-[#42D2B8] mt-1">•</span>
                <span>챌린지 조건(예: 소비 금액 제한, 품목 구매 금지 등)을 위반하면 즉시 실패 처리됩니다.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#42D2B8] mt-1">•</span>
                <span>실패 시 해당 챌린지의 리워드 및 보증금은 지급되지 않습니다.</span>
              </li>
            </ul>
          </section>

          {/* 리워드 지급 기준 */}
          <section className="mb-6">
            <h3 className="text-[16px] font-bold text-slate-800 mb-3">리워드 지급 기준</h3>
            <ul className="space-y-2 text-[14px] text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-[#42D2B8] mt-1">•</span>
                <span>챌린지 수행 여부는 결제 내역을 기반으로 자동 체크 됩니다.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#42D2B8] mt-1">•</span>
                <span>진행기간에 따라 리워드가 차등 지급됩니다.</span>
              </li>
            </ul>
            
            {/* 리워드 포인트 표 */}
            <div className="mt-4 bg-[#F8FAFC] rounded-xl p-4">
              <div className="grid grid-cols-2 gap-4 text-[14px]">
                <div className="text-center">
                  <p className="font-semibold text-[#42D2B8]">3일</p>
                  <p className="text-slate-600">500 포인트</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-[#42D2B8]">7일</p>
                  <p className="text-slate-600">1,200 포인트</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-[#42D2B8]">14일</p>
                  <p className="text-slate-600">2,500 포인트</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-[#42D2B8]">30일</p>
                  <p className="text-slate-600">5,000 포인트</p>
                </div>
              </div>
            </div>
            
            <ul className="space-y-2 text-[14px] text-slate-700 mt-4">
              <li className="flex items-start gap-2">
                <span className="text-[#42D2B8] mt-1">•</span>
                <span>챌린지를 완수한 경우에만 리워드가 지급됩니다.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#42D2B8] mt-1">•</span>
                <span>리워드는 랜덤 상품권 뽑기, 포인트 둘 중 하나로 수령합니다.</span>
              </li>
            </ul>
          </section>

          {/* 리워드 이용 */}
          <section className="mb-6">
            <h3 className="text-[16px] font-bold text-slate-800 mb-3">리워드 이용</h3>
            <ul className="space-y-2 text-[14px] text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-[#42D2B8] mt-1">•</span>
                <span>포인트를 이용하여 상품 페이지의 제휴업체 바우처, 캐릭터(아이템) 구매가 가능합니다.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#42D2B8] mt-1">•</span>
                <span>캐릭터(아이템) 구매는 마이페이지를 통해 이용 가능합니다.</span>
              </li>
            </ul>
          </section>
        </div>

        {/* 동의 체크박스 */}
        <div className="mt-6 flex justify-center gap-8">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="agreement"
              value="agree"
              checked={agreement === "agree"}
              onChange={() => setAgreement("agree")}
              className="w-4 h-4 text-[#42D2B8] border-slate-300 focus:ring-[#42D2B8]"
            />
            <span className="text-[14px] text-slate-700">동의</span>
          </label>
          
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="agreement"
              value="disagree"
              checked={agreement === "disagree"}
              onChange={() => setAgreement("disagree")}
              className="w-4 h-4 text-slate-400 border-slate-300 focus:ring-slate-400"
            />
            <span className="text-[14px] text-slate-500">동의하지 않음</span>
          </label>
        </div>

        {/* 다음 버튼 */}
        <div className="mt-6">
          <button
            onClick={handleNext}
            disabled={agreement !== "agree"}
            className={`
              w-full py-4 rounded-2xl text-[16px] font-semibold transition-all
              ${agreement === "agree" 
                ? "bg-[#42D2B8] text-white hover:bg-[#3BC4A8] active:scale-95" 
                : "bg-white border border-slate-300 text-slate-400 cursor-not-allowed"
              }
            `}
          >
            다음
          </button>
        </div>
      </main>
    </div>
  );
}
