export default function OverViewTemplate() {
  return (
    <>
      <section className="relative w-full bg-[#DDF6F2] px-5 pt-6 pb-4 overflow-hidden">
        {/* 상단 타이틀 & 알림 아이콘 */}
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

        {/* 우측 라벨 배지 */}
        <div className="absolute right-5 top-[120px] flex flex-col gap-4">
          <Badge size={51}>D-6</Badge>
          <Badge size={51}>500p</Badge>
        </div>

        {/* 일러스트 */}
        <div className="mt-6 flex justify-center">
          <img src="/squirrel.svg" alt="다람쥐" className="w-[197px] h-[198px]" />
        </div>

        {/* 금액 정보 */}
        <div className="mt-5">
          <p className="text-slate-500 text-[12px]">사용 가능 금액</p>
          <div className="mt-1.5 flex items-baseline gap-2.5">
            <span className="text-[28px] font-extrabold tracking-tight text-slate-800">47,000원</span>
            <span className="text-[22px] text-slate-400">/</span>
            <span className="text-[22px] text-slate-400">100,000원</span>
          </div>
        </div>
      </section>

      {/* 인용문 + 버튼 */}
      <section className="bg-white px-6 pt-6 pb-10">
        <p className="text-center text-[18px] leading-7 font-semibold text-slate-700">
          <span className="text-[] text-[22px] align-middle"></span>
          "카드 대신 이성을 꺼내자"
          <span className="text-slate-300 text-[22px] align-middle"></span>
        </p>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <PrimaryButton ariaLabel="챌린지">챌린지</PrimaryButton>
          <PrimaryButton ariaLabel="결제 내역">결제 내역</PrimaryButton>
        </div>

      </section>
      <section className="bg-[#F5F6F8] px-5 py-6">
        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5">
          <p className="text-[20px] font-extrabold leading-snug text-slate-800">
            잔액이 189,500원 남았습니다.
          </p>

          <p className="mt-1.5 flex items-center gap-2 text-[14px] text-slate-500">
          전월 대비 4% 감소
            <svg
              width="28" height="28" viewBox="0 0 30 25" aria-hidden="true"
              className="text-[#42D2B8]" fill="currentColor"
            >
              <path d="M12 16l-6-8h12l-6 8z" />
            </svg>
          </p>

        {/* 진행바 */}
        <div className="mt-5">
          <div
            className="relative h-7 w-full rounded-full bg-[#DDF6F2]"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={70}
          >
        <div
          className="absolute left-0 top-0 h-full rounded-full bg-[#42D2B8] flex items-center justify-center whitespace-nowrap text-white text-[14px] font-semibold"
          style={{ width: '70%' }}
        >
          560,500
        </div>

      </div>

      {/* 하단 설명 */}
      <div className="mt-2 text-right text-[14px]">
        월 예산 중 70% 소비
      </div>
    </div>
  </div>
</section>

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


function PrimaryButton({
  children,
  onClick,
  ariaLabel,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  ariaLabel?: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className="
        w-full rounded-2xl px-4 py-4
        font-semibold text-[16px]
        bg-gradient-to-b from-[#39E0D5] to-[#42D2B8]
        text-[#000000]
        active:scale-95
      "
    >
      {children}
    </button>
  );
}
