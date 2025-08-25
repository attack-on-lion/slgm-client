"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ServiceNavigator from "@/components/molecule/(service)/Navigator";
import paymentApi from "@/services/api/payment";
import { PaymentItem, PaymentSummary } from "@/interfaces/Payment";
import useSign from "@/hooks/useSign";
import Image from "next/image";

export default function MainPage() {
  const router = useRouter();
  const { userId, userData } = useSign();
  const [recentPayment, setRecentPayment] = useState<PaymentItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [balanceInfo, setBalanceInfo] = useState<any>(null);
  const[summary, setSummary] = useState<PaymentSummary>();
  const [budgetStatus, setBudgetStatus] = useState<any>(null);

  const navigateToChallenge = () => router.push("/challenge");
  const navigateToReports = () => router.push("/reports");

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // 결제 내역 조회
        try {
          const today = new Date();
          const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
          const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
          
          const response = await paymentApi.getPayments(userId, {
            from: firstDay.toISOString().split('T')[0],
            to: lastDay.toISOString().split('T')[0],
            page: 0,
            size: 1
          });
          setSummary(response.summary);
          if (response.items && response.items.length > 0) {
            setRecentPayment(response.items[0]);
          }
        } catch (error) {
          console.warn('결제 내역 조회 실패:', error);
        }

        // 잔액 정보 조회
        try {
          const balanceResponse = await paymentApi.getBalanceInfo(userId);
          setBalanceInfo(balanceResponse);
        } catch (error) {
          console.warn('잔액 정보 조회 실패:', error);
        }

        // 월 예산 소비 현황 조회
        try {
          const currentMonth = new Date().getMonth() + 1;
          const budgetResponse = await paymentApi.getMonthlyBudgetStatus(userId, currentMonth);
          setBudgetStatus(budgetResponse);
        } catch (error) {
          console.warn('월 예산 소비 현황 조회 실패:', error);
        }
        
      } catch (error) {
        console.warn('데이터 조회 중 예상치 못한 오류가 발생했습니다:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <>
      <section className="relative w-full bg-[#DDF6F2] px-5 pt-6 pb-4 overflow-hidden">
        <header className="flex items-start justify-between">
          <div>
            <h1 className="text-[20px] leading-tight font-extrabold text-slate-800">
              슬기로운 소비생활
            </h1>
            <p className="mt-3 text-[14px] text-slate-500">적게 쓰기 챌린지</p>
            <p className="mt-1.5 text-[24px] leading-[1.15] font-extrabold text-slate-800 tracking-tight">
              이 정도면 소비가 취미야.
            </p>
          </div>
          <BellIcon className="w-7 h-7 text-[#FFC83D]" />
        </header>

        <div className="absolute right-5 top-[120px] flex flex-col gap-4">
          <Badge size={51}>D-7</Badge>
          <Badge size={51}>{userData?.point || 0}p</Badge>
        </div>

        <div className="mt-6 flex justify-center">
          <Image src="/squirrel.svg" alt="다람쥐" className="w-[197px] h-[198px]" width={197} height={198} />
        </div>

        <div className="mt-5">
          <p className="text-slate-500 text-[12px]">사용 가능 금액</p>
          <div className="mt-1.5 flex items-baseline gap-2.5">
            <span className="text-[28px] font-extrabold tracking-tight text-slate-800">
              {(Number(userData?.baseAmount)-Number(summary?.totalExpense)  || 0).toLocaleString()}원
            </span>
            <span className="text-[22px] text-slate-400">/</span>
            <span className="text-[22px] text-slate-400">
              {(userData?.baseAmount || 0).toLocaleString()}원
            </span>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 pt-6 pb-10">
        <p className="text-center text-[18px] leading-7 font-semibold text-slate-700">
          &ldquo;카드 대신 이성을 꺼내자&rdquo;
        </p>



        <div className="mt-6 grid grid-cols-2 gap-4">
          <PrimaryButton onClick={navigateToChallenge}>챌린지</PrimaryButton>
          <PrimaryButton onClick={navigateToReports}>결제 내역</PrimaryButton>
        </div>
      </section>
      <section className="bg-[#F5F5F5] px-5 py-6">
        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5">
          <p className="text-[20px] font-extrabold leading-snug">
            잔액이 {balanceInfo?.remainingBalance ? balanceInfo.remainingBalance.toLocaleString() : (userData?.point || 0).toLocaleString()}원 남았습니다.
          </p>

          <p className="mt-1.5 flex items-center gap-2 text-[14px] text-slate-500">
            전월 대비 {balanceInfo?.monthOverMonthChange ? Math.abs(balanceInfo.monthOverMonthChange).toFixed(1) : 4}% {balanceInfo?.monthOverMonthChange && balanceInfo.monthOverMonthChange < 0 ? '감소' : '증가'}
            <svg width="28" height="28" viewBox="0 0 30 25" className={`${balanceInfo?.monthOverMonthChange && balanceInfo.monthOverMonthChange < 0 ? 'text-[#42D2B8]' : 'text-red-500'} transform ${balanceInfo?.monthOverMonthChange && balanceInfo.monthOverMonthChange < 0 ? '' : 'rotate-180'}`} fill="currentColor">
              <path d="M12 16l-6-8h12l-6 8z" />
            </svg>
          </p>

          <div className="mt-5">
            <div className="relative h-7 w-full rounded-full bg-[#DDF6F2]">
              <div 
                className="absolute left-0 top-0 h-full rounded-full bg-[#42D2B8] flex items-center justify-center text-white text-[14px] font-semibold" 
                style={{ width: `${Math.min((balanceInfo?.remainingBalance || userData?.point || 0) / 500000 * 100, 100)}%` }}
              >
                {balanceInfo?.remainingBalance ? balanceInfo.remainingBalance.toLocaleString() : (userData?.point || 0).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F5F6F8] px-6 pt-0 pb-8">
        <div className="py-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[18px] font-bold text-slate-800">결제 내역</h3>
            <button onClick={navigateToReports} className="text-[14px] text-slate-500 hover:text-slate-700">
              &gt;
            </button>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-4">
            {loading ? (
              <div className="flex items-center justify-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#42B6A1]"></div>
              </div>
            ) : recentPayment ? (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[16px] font-bold text-slate-800">{recentPayment.storeName}</p>
                  <p className="text-[14px] text-slate-500 mt-1">
                    {new Date(recentPayment.transactionAt).toLocaleTimeString('ko-KR', { 
                      hour: '2-digit', 
                      minute: '2-digit',
                      hour12: false 
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[14px] text-[#42B6A1]">{recentPayment.category.name}</p>
                  <p className="text-[16px] font-bold text-slate-800 mt-1">
                    {recentPayment.direction === 'INFLOW' ? '+' : '-'}{recentPayment.amount.toLocaleString()}원
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-4 text-slate-500">
                <p>결제내역이 없습니다</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <ServiceNavigator />
    </>
  );
}

function Badge({ children, size = 70 }: { children: React.ReactNode; size?: number }) {
  return (
    <div
      className="rounded-full bg-[#25D3C8] text-white grid place-items-center font-semibold shadow-[0_6px_20px_rgba(0,0,0,0.08)]"
      style={{ width: size, height: size, fontSize: Math.round(size * 0.3) }}
    >
      {children}
    </div>
  );
}

function BellIcon({ className = 'w-6 h-6 text-yellow-400' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 3a6 6 0 0 0-6 6v2.35c0 .53-.21 1.04-.58 1.41L4 14h16l-1.42-1.24a2 2 0 0 1-.58-1.41V9a6 6 0 0 0-6-6Z" />
      <path d="M9.75 18a2.25 2.25 0 0 0 4.5 0h-4.5Z" />
    </svg>
  );
}

function PrimaryButton({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-2xl px-4 py-4 font-semibold text-[16px] bg-gradient-to-b from-[#39E0D5] to-[#42D2B8] text-black active:scale-95"
    >
      {children}
    </button>
  );
}