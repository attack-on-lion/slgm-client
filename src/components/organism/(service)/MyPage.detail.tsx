'use client'
import { cn } from "fast-jsx/util"
import { State } from "fast-jsx/interface"
import ChallengeStatus from "@/components/molecule/(service)/ChallengeStatus"
import Section from "@/components/atom/Section"
import MyCouponButton from "@/components/molecule/(service)/MyCoupon.button"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { userApi } from "@/services/api/user"
import useSign from "@/hooks/useSign"

interface UserPointUsage {
  items: {
    id: number;
    userId: number;
    sourceKind: string;
    delta: number;
    balance: number;
    challengeDays: number;
    createdAt: Date;
    updatedAt: Date;
  }[];
}

export default function MyPageDetail({ state }: { state: State<boolean> }) {
  const [isDetail, setIsDetail] = state;
  const router = useRouter();
  const { userId } = useSign();
  const [pointHistories, setPointHistories] = useState<UserPointUsage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPointHistories = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await userApi.getUserPoint(userId);
        setPointHistories(data);
      } catch (error) {
        console.error('포인트 내역 조회 실패:', error);
        setPointHistories({ items: [] });
      } finally {
        setLoading(false);
      }
    };

    fetchPointHistories();
  }, [userId]);

  const container = {
    position: "absolute z-40",
    display: 'flex flex-col gap-y-[8px]',
    location: isDetail ? "bottom-0" : "-bottom-full",
    size: 'w-full h-screen',
    transition: "transition-all duration-300",
    background: "bg-bg-color-2",
  }
  const buttonBox = {
    display: 'flex items-center justify-center',
    size: 'w-[162px] h-[49px]',
    border: 'border-1 border-sub-title-3 rounded-[13px]',
  }
  const historyBox = (isFirst: boolean) => ({
    display: 'flex justify-between items-center',
    size: 'w-[345px] h-[63px]',
    padding: 'px-[8px]',
    border: !isFirst && "border-t-1 border-stroke"
  })

  // 포인트 소스 종류를 한국어로 변환하는 함수
  const getSourceKindKorean = (sourceKind: string): string => {
    switch (sourceKind) {
      case 'CHARACTER_PURCHASE':
      case 'purchase':
        return '구매';
      case 'CHALLENGE_COMPLETION':
      case 'pay_not':
      case 'pay_less':
      case 'pay_save':
        return '챌린지 완료';
      case 'POINT_EARNED':
        return '포인트 획득';
      case 'POINT_USED':
        return '포인트 사용';
      default:
        return sourceKind;
    }
  };

  // 포인트 변화량을 표시하는 함수 (양수/음수 구분)
  const formatPointDelta = (delta: number): string => {
    const sign = delta >= 0 ? '+' : '';
    return `${sign}${delta.toLocaleString()}`;
  };

  return <div onClick={() => setIsDetail(!isDetail)} className={cn(container)}>
    <Section>
      <div className="flex flex-col gap-y-[20px] pt-[69px]">
        <ChallengeStatus
          button={<MyCouponButton />}
          version="v2"
        />
        <div className="flex gap-x-[22px]">
          <button
            className={cn(buttonBox)}
            onClick={() => {
              router.push('/my-page/characters')
            }}
          >캐릭터 구매하기</button>
          <button className={cn(buttonBox)}>포인트</button>
        </div>
      </div>
    </Section>
    <Section title="포인트 내역">
      <div className="flex flex-col">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#42D2B8]"></div>
          </div>
        ) : pointHistories?.items && pointHistories.items.length > 0 ? (
          pointHistories.items.map((history, index) => (
            <div key={history.id} className={cn(historyBox(index === 0))}>
              <div className="flex flex-col gap-y-[4px]">
                <div className="text-[16px] leading-none font-bold">{getSourceKindKorean(history.sourceKind)}</div>
                <div className="text-sub-title text-[12px]">
                  {new Date(history.createdAt).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                  })}
                </div>
              </div>
              <div className="flex flex-col gap-y-[4px]">
                <div className="text-main text-[12px]">{history.challengeDays || 0}일</div>
                <div className={`text-[16px] leading-none font-bold ${history.delta >= 0 ? 'text-main' : 'text-sub-title-2'}`}>
                  {formatPointDelta(history.delta)} p
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-slate-500">
            <p>포인트 내역이 없습니다.</p>
            <p className="text-[12px] mt-1">챌린지를 완료하거나 캐릭터를 구매하면 포인트 내역이 표시됩니다.</p>
          </div>
        )}
      </div>
    </Section>
  </div>
}