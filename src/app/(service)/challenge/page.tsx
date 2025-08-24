"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function ChallengePage() {
  const router = useRouter();
  
  const challengeData = [
    {
      title: "식비 줄이기 챌린지",
      duration: "30일",
      goal: "식비 절약하기"
    },
    {
      title: "의류 소비 줄이기 챌린지", 
      duration: "14일",
      goal: "의류 절약하기"
    }
  ];

  const handleClose = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-white">
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

      <section className="bg-[#DDF6F2] px-5 py-6 mx-5 mt-4 rounded-2xl">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-[20px] font-bold text-slate-800 mb-2">안녕하세요 000님!</h2>
            <p className="text-[16px] text-slate-700 mb-4">챌린지를 통해 절약해보세요!</p>
            <button 
              onClick={() => router.push("/challenge/regulations")}
              className="bg-white border border-slate-300 text-slate-800 px-4 py-2 rounded-lg text-[14px] font-medium hover:bg-slate-50 transition-colors"
            >
              챌린지 설정하기
            </button>
          </div>
          <div className="ml-4">
            <img src="/squirrel.svg" alt="다람쥐" className="w-20 h-20" />
          </div>
        </div>
      </section>

      <section className="px-5 mt-6">
        <h3 className="text-[18px] font-bold text-slate-800 mb-4">추천 챌린지</h3>
        
        <div className="flex gap-4 overflow-x-auto pb-4">
          {challengeData.map((challenge, index) => (
            <div key={index} className="min-w-[280px] relative">
              <img src="/chCard.svg" alt="챌린지 카드" className="w-full h-auto" />
              
              <div className="absolute bottom-4 left-4 right-4">
                <button className="w-full bg-white border border-slate-800 text-slate-800 py-2 rounded-lg text-[14px] font-medium hover:bg-slate-50 transition-colors">
                  시작하기
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 mt-6">
        <div className="flex gap-3 overflow-x-auto pb-2">
          <button className="px-4 py-2 bg-[#DDF6F2] border border-[#42D2B8] text-[#42D2B8] rounded-full text-[14px] font-medium whitespace-nowrap">
            모든 소비
          </button>
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-full text-[14px] font-medium whitespace-nowrap hover:bg-slate-50">
            3일
          </button>
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-full text-[14px] font-medium whitespace-nowrap hover:bg-slate-50">
            7일
          </button>
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-full text-[14px] font-medium whitespace-nowrap hover:bg-slate-50">
            14일
          </button>
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-full text-[14px] font-medium whitespace-nowrap hover:bg-slate-50">
            30일
          </button>
        </div>
      </section>

      <section className="px-5 mt-6 pb-8">
                  <div className="grid grid-cols-2 gap-4">
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm">
            <div className="bg-[#E0F2FE] px-3 py-2 rounded-t-2xl">
              <h4 className="text-[14px] font-bold text-slate-800 mb-1"></h4>
              <div className="flex items-center gap-2 text-[10px] text-slate-600"></div>
              <div className="flex items-center gap-2 text-[10px] text-slate-600"></div>
            </div>
            
            <div className="p-3">
                              <p className="text-[12px] text-slate-700 mb-3 leading-relaxed"></p>
              
              <button className="w-full bg-white border border-slate-300 text-slate-800 py-2 rounded-lg text-[12px] font-medium hover:bg-slate-50 transition-colors">
                시작하기
              </button>
            </div>
          </div>

                      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm">
            <div className="bg-[#E0F2FE] px-3 py-2 rounded-t-2xl">
              <h4 className="text-[14px] font-bold text-slate-800 mb-1"></h4>
              <div className="flex items-center gap-2 text-[10px] text-slate-600"></div>
              <div className="flex items-center gap-2 text-[10px] text-slate-600"></div>
            </div>
            
            <div className="p-3">
                              <p className="text-[12px] text-slate-700 mb-3 leading-relaxed"></p>
              
              <button className="w-full bg-white border border-slate-300 text-slate-800 py-2 rounded-lg text-[12px] font-medium hover:bg-slate-50 transition-colors">
                시작하기
              </button>
            </div>
          </div>

                      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm">
            <div className="bg-[#E0F2FE] px-3 py-2 rounded-t-2xl">
              <h4 className="text-[14px] font-bold text-slate-800 mb-1"></h4>
              <div className="flex items-center gap-2 text-[10px] text-slate-600"></div>
              <div className="flex items-center gap-2 text-[10px] text-slate-600"></div>
            </div>
            
            <div className="p-3">
                              <p className="text-[12px] text-slate-700 mb-3 leading-relaxed"></p>
              
              <button className="w-full bg-white border border-slate-300 text-slate-800 py-2 rounded-lg text-[12px] font-medium hover:bg-slate-50 transition-colors">
                시작하기
              </button>
            </div>
          </div>

                      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm">
            <div className="bg-[#E0F2FE] px-3 py-2 rounded-t-2xl">
              <h4 className="text-[14px] font-bold text-slate-800 mb-1"></h4>
              <div className="flex items-center gap-2 text-[10px] text-slate-600"></div>
              <div className="flex items-center gap-2 text-[10px] text-slate-600"></div>
            </div>
            
            <div className="p-3">
                              <p className="text-[12px] text-slate-700 mb-3 leading-relaxed"></p>
              
              <button className="w-full bg-white border border-slate-300 text-slate-800 py-2 rounded-lg text-[12px] font-medium hover:bg-slate-50 transition-colors">
                시작하기
              </button>
            </div>
          </div>

                      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm">
            <div className="bg-[#E0F2FE] px-3 py-2 rounded-t-2xl">
              <h4 className="text-[14px] font-bold text-slate-800 mb-1"></h4>
              <div className="flex items-center gap-2 text-[10px] text-slate-600"></div>
              <div className="flex items-center gap-2 text-[10px] text-slate-600"></div>
            </div>
            
            <div className="p-3">
                              <p className="text-[12px] text-slate-700 mb-3 leading-relaxed"></p>
              
              <button className="w-full bg-white border border-slate-300 text-slate-800 py-2 rounded-lg text-[12px] font-medium hover:bg-slate-50 transition-colors">
                시작하기
              </button>
            </div>
          </div>

                      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm">
            <div className="bg-[#E0F2FE] px-3 py-2 rounded-t-2xl">
              <h4 className="text-[14px] font-bold text-slate-800 mb-1"></h4>
              <div className="flex items-center gap-2 text-[10px] text-slate-600"></div>
              <div className="flex items-center gap-2 text-[10px] text-slate-600"></div>
            </div>
            
            <div className="p-3">
                              <p className="text-[12px] text-slate-700 mb-3 leading-relaxed"></p>
              
              <button className="w-full bg-white border border-slate-300 text-slate-800 py-2 rounded-lg text-[12px] font-medium hover:bg-slate-50 transition-colors">
                시작하기
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
