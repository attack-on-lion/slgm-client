"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import challengeApi from "@/services/api/challenge";
import { userApi } from "@/services/api/user";
import { UserProfile } from "@/interfaces/User";
import { Recommendation } from "@/interfaces/Challenge";
import useSign from "@/hooks/useSign";
import Image from "next/image";
import { returnPoint } from "@/utils/point";

// 챌린지 타입을 한국어로 변환하는 함수
const getChallengeTypeKorean = (challengeType: string): string => {
  switch (challengeType) {
    case 'pay_not':
      return '안쓰기';
    case 'pay_less':
      return '줄이기';
    case 'pay_save':
      return '모으기';
    default:
      return '줄이기';
  }
};

export default function ChallengePage() {
  const router = useRouter();
  const { userId, userData } = useSign();
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [availableChallenges, setAvailableChallenges] = useState<any[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [selectedDays, setSelectedDays] = useState<number | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const [recs, available, profile] = await Promise.all([
          challengeApi.createRecommendations({
            user_id: "1",
            pays: [
              { transactionAt: "2025-01-20", category: "식비" },
              { transactionAt: "2025-01-20", category: "쇼핑" }
            ]
          }),
          challengeApi.getAvailableChallenges(),
          userApi.getUserProfile(1)
        ]);
        
        setRecommendations(recs?.recommendations || []);
        setAvailableChallenges(available || []);
        setUserProfile(profile);
      } catch (error) {
        console.error('챌린지 데이터 조회 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  // 필터링된 챌린지 계산
  const filteredChallenges = selectedDays 
    ? availableChallenges.filter(challenge => challenge.challengeDays === selectedDays)
    : availableChallenges;

  const handleDaysFilter = async (days: number) => {
    setSelectedDays(days);
  };

  const handleAllFilter = async () => {
    setSelectedDays(null);
  };

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
            <h2 className="text-[20px] font-bold text-slate-800 mb-2">
              안녕하세요 {userProfile?.name || '000'}님!
            </h2>
            <p className="text-[16px] text-slate-700 mb-4 whitespace-nowrap">챌린지를 통해 절약해보세요!</p>
            <button 
              onClick={() => router.push("/challenge/regulations")}
              className="bg-white border border-black text-slate-800 px-6 py-2 rounded-lg text-[12px] font-medium hover:bg-slate-50 transition-colors"
            >
              챌린지 설정하기
            </button>
          </div>
          
          <div className="flex-shrink-0 ml-2 self-end -mb-2">
            <Image 
              src="/squirrel.svg" 
              alt="다람쥐 캐릭터" 
              className="w-20 h-20 object-contain"
              width={80}
              height={80}
            />
          </div>
        </div>
      </section>

      <section className="px-5 mt-6">
        <h3 className="text-[18px] font-bold text-slate-800 mb-4 text-center">추천 챌린지</h3>
        
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#42D2B8]"></div>
          </div>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-4 justify-center">
            {recommendations.map((challenge, index) => (
              <div key={index} className="min-w-[280px] bg-[#DDF6F2] border-2 border-[#42D2B8] rounded-2xl shadow-sm p-5 flex flex-col relative min-h-[320px]">
                <h4 className="text-[22px] font-bold text-[#006D6F] mb-4 line-clamp-2 text-center">
                  {Array.isArray(challenge.categories) ? challenge.categories.join(' ') : challenge.categories} {getChallengeTypeKorean(challenge.challengeType)}
                </h4>
                
                <div className="flex-1 space-y-4 mb-4">
                  <div className="flex flex-wrap gap-2 justify-center">
                    <span className="inline-flex items-center px-3 py-1.5 bg-[#DDF6F2] text-slate-700 text-[12px] font-medium rounded-lg border border-[#42D2B8]">
                      <span className="w-2 h-2 bg-[#42D2B8] rounded-full mr-2"></span>
                      {challenge.challengeDays}일
                    </span>
                    <span className="inline-flex items-center px-3 py-1.5 bg-[#DDF6F2] text-slate-700 text-[12px] font-medium rounded-lg border border-[#42D2B8]">
                      <span className="w-2 h-2 bg-[#42D2B8] rounded-full mr-2"></span>
                      {returnPoint(challenge.challengeDays)}p
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-center mb-4">
                  <Image 
                    src="/squirrel.svg" 
                    alt="다람쥐 캐릭터" 
                    className="w-28 h-28 object-contain"
                    width={112}
                    height={112}
                  />
                </div>
                
                <button className="w-full bg-white border border-[#42D2B8] text-[#42D2B8] py-3 rounded-xl text-[14px] font-semibold hover:bg-[#DDF6F2] active:scale-95 transition-all mt-auto">
                  시작하기
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="px-5 mt-6">
        <div className="flex gap-3 overflow-x-auto pb-2 justify-center">
          <button 
            onClick={handleAllFilter}
            className={`px-4 py-2 border rounded-full text-[14px] font-medium whitespace-nowrap transition-colors ${
              selectedDays === null 
                ? 'bg-[#DDF6F2] border-[#42D2B8] text-[#42D2B8]' 
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            모든 소비
          </button>
          {[3, 7, 14, 30].map((days) => (
            <button 
              key={days}
              onClick={() => handleDaysFilter(days)}
              className={`px-4 py-2 border rounded-full text-[14px] font-medium whitespace-nowrap transition-colors ${
                selectedDays === days 
                  ? 'bg-[#DDF6F2] border-[#42D2B8] text-[#42D2B8]' 
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {days}일
            </button>
          ))}
        </div>
      </section>

      <section className="px-5 mt-6 pb-8">
        <h3 className="text-[18px] font-bold text-slate-800 mb-4 text-center">시작 가능한 챌린지</h3>
        
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#42D2B8]"></div>
          </div>
        ) : filteredChallenges.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
            {filteredChallenges.map((challenge, index) => (
              <div key={index} className="bg-white border border-slate-200 rounded-2xl shadow-sm">
                <div className="bg-[#E0F2FE] px-3 py-2 rounded-t-2xl">
                  <h4 className="text-[14px] font-bold text-slate-800 mb-1">{challenge.challengeName}</h4>
                  <div className="flex items-center gap-2 text-[10px] text-slate-600">
                    <span>{challenge.challengeDays}일</span>
                    <span>{challenge.challengeType === 'pay_not' ? '안쓰기' : 
                           challenge.challengeType === 'pay_less' ? '줄이기' : '모으기'}</span>
                  </div>
                </div>
                
                <div className="p-3">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[12px] text-slate-600">포인트</span>
                    <span className="text-[14px] font-bold text-[#42D2B8]">{returnPoint(challenge.challengeDays)}p</span>
                  </div>
                  
                  <button className="w-full bg-white border border-slate-300 text-slate-800 py-2 rounded-lg text-[12px] font-medium hover:bg-slate-50 transition-colors">
                    시작하기
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-slate-500">
            <p>시작 가능한 챌린지가 없습니다.</p>
          </div>
        )}
      </section>
    </div>
  );
}