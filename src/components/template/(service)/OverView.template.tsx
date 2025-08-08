export default function OverViewTemplate() {
  return (
    <section className="relative h-[493px] w-full bg-[#DDF6F2] px-5 pt-6 pb-4 overflow-hidden">
      {/* 상단 타이틀 & 알림 아이콘 */}
      <header className="flex items-start justify-between">
        <div>
          <h1 className="text-[22px] leading-tight font-extrabold text-slate-800">
            슬기로운 소비생활
          </h1>
          <p className="mt-3 text-[14px] text-slate-500">적게 쓰기 챌린지</p>
          <p className="mt-1.5 text-[28px] leading-[1.15] font-extrabold text-slate-800 tracking-tight">
            이 정도면 소비가 취미야.
          </p>
        </div>
        <BellIcon className="w-7 h-7 text-[#FFC83D]" />
      </header>

      {/* 우측 라벨 배지 */}
      <div className="absolute right-5 top-[120px] flex flex-col gap-4">
        <Badge size={70}>D-6</Badge>
        <Badge size={70}>500p</Badge>
      </div>

      {/* 일러스트 플레이스홀더 (이미지 자리) */}
      <div className="mt-6 flex justify-center">
        <div className="w-[240px] h-[240px] rounded-[24px] bg-white/70 shadow-md grid place-items-center">
          <span className="text-slate-400 text-sm">(일러스트 자리)</span>
        </div>
      </div>

      {/* 금액 정보 */}
      <div className="mt-5">
        <p className="text-slate-500 text-[13px]">사용 가능 금액</p>
        <div className="mt-1.5 flex items-baseline gap-2.5">
          <span className="text-[32px] font-extrabold tracking-tight text-slate-800">47,000원</span>
          <span className="text-[22px] text-slate-400">/</span>
          <span className="text-[22px] text-slate-400">100,000원</span>
        </div>
      </div>
    </section>
  )
}

function Badge({ children, size = 70 }: { children: React.ReactNode; size?: number }) {
  return (
    <div
      className="rounded-full bg-[#25D3C8] text-white grid place-items-center font-semibold shadow-[0_6px_20px_rgba(0,0,0,0.08)]"
      style={{ width: size, height: size, fontSize: Math.round(size * 0.3) }}
    >
      {children}
    </div>
  )
}

function BellIcon({ className = 'w-6 h-6 text-yellow-400' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 3a6 6 0 0 0-6 6v2.35c0 .53-.21 1.04-.58 1.41L4 14h16l-1.42-1.24a2 2 0 0 1-.58-1.41V9a6 6 0 0 0-6-6Z" />
      <path d="M9.75 18a2.25 2.25 0 0 0 4.5 0h-4.5Z" />
    </svg>
  )
}  