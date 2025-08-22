import Link from "next/link"
import { usePathname } from "next/navigation"

export default function ServiceNavigator() {
  const pathname = usePathname()
  const items = [
    { href: '/', label: '홈', icon: <IconHome className="w-7 h-7" /> },
    { href: '/reports', label: '분석', icon: <IconChart className="w-7 h-7" /> },
    { href: '/stores', label: '상품', icon: <IconBag className="w-7 h-7" /> },
    { href: '/my-page', label: '마이페이지', icon: <IconUser className="w-7 h-7" /> }
  ]

  return (
    <nav className="absolute bottom-0 left-0 right-0 h-[49px] bg-white border-t border-gray-200 z-30">
      <ul className="grid grid-cols-4 h-full">
        {items.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
          const base = 'h-full flex flex-col items-center justify-center text-[11px] font-medium text-gray-500'
          const active = isActive ? ' text-blue-600' : ''
          return (
            <li key={item.href} className="h-full flex justify-center">
              <Link aria-current={isActive ? 'page' : undefined} href={item.href} className={base + active}>
                <span className="mb-0.5">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

function IconHome({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M3 10.5L12 4l9 6.5" />
      <path d="M5 10v9.5a1.5 1.5 0 0 0 1.5 1.5H17.5A1.5 1.5 0 0 0 19 19.5V10" />
      <path d="M9 21V13h6v8" />
    </svg>
  )
}

function IconChart({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <path d="M7 15l4-5 3 3 3-4" />
    </svg>
  )
}

function IconBag({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M5 9h14l-1.2 10.2A2 2 0 0 1 15.82 21H8.18A2 2 0 0 1 6.2 19.2L5 9z" />
      <path d="M8 9V7a4 4 0 1 1 8 0v2" />
    </svg>
  )
}

function IconUser({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 20.5a7.5 7.5 0 0 1 15 0" />
    </svg>
  )
}