import Link from "next/link"
import { usePathname } from "next/navigation"

export default function ServiceNavigator() {
  const pathname = usePathname()
  const items = [
    { href: '/', label: '홈', icon: <IconHome isActive={pathname === '/'} /> },
    { href: '/analysis', label: '분석', icon: <IconChart isActive={pathname === '/analysis'} /> },
    { href: '/stores', label: '상품', icon: <IconBag isActive={pathname === '/stores'} /> },
    { href: '/my-page', label: '마이페이지', icon: <IconUser isActive={pathname === '/my-page'} /> }
  ]

  return (
    <nav className="absolute bottom-0 left-0 right-0 h-[49px] bg-white border-t border-gray-200 z-30">
      <ul className="grid grid-cols-4 h-full">
        {items.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
          const base = 'h-full flex flex-col items-center justify-center text-[11px] font-medium text-gray-500'
          const active = isActive ? ' text-main' : ''
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

function IconHome({isActive}:{isActive:boolean}) {
  if(isActive){
    return <svg xmlns="http://www.w3.org/2000/svg" width="22" height="23" viewBox="0 0 22 23" fill="none">
    <path d="M21 10.2V18.5C21 20.16 19.66 21.5 18 21.5H4C2.34 21.5 1 20.16 1 18.5V10C1 9.08 1.42 8.22 2.12 7.66L9 2.16C10.1 1.28 11.66 1.28 12.74 2.16L19.86 7.86C20.58 8.42 20.98 9.3 20.98 10.2H21Z" stroke="#42D2B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="23" viewBox="0 0 22 23" fill="none">
  <path d="M21 10.2V18.5C21 20.16 19.66 21.5 18 21.5H4C2.34 21.5 1 20.16 1 18.5V10C1 9.08 1.42 8.22 2.12 7.66L9 2.16C10.1 1.28 11.66 1.28 12.74 2.16L19.86 7.86C20.58 8.42 20.98 9.3 20.98 10.2H21Z" stroke="#D3D3D3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
  )
}

function IconChart({isActive}:{isActive:boolean}) {
  if(isActive){
    return (<svg xmlns="http://www.w3.org/2000/svg" width="22" height="23" viewBox="0 0 22 23" fill="none">
    <path d="M14.8891 14.8334H7.11133" stroke="#42D2B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14.8891 8.1665L12.1113 10.3887L9.88911 8.1665L7.11133 10.3887" stroke="#42D2B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="1" y="1.5" width="20" height="20" rx="3" stroke="#42D2B8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
  )}
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="23" viewBox="0 0 22 23" fill="none">
    <path d="M14.8891 14.8334H7.11133" stroke="#D3D3D3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14.8891 8.1665L12.1113 10.3887L9.88911 8.1665L7.11133 10.3887" stroke="#D3D3D3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="1" y="1.5" width="20" height="20" rx="3" stroke="#D3D3D3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
  )
}

function IconBag({isActive}:{isActive:boolean}) {
  if(isActive){ 
    return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
    <path fillRule="evenodd" clipRule="evenodd" d="M0.43934 6.43934C0.720644 6.15804 1.10217 6 1.5 6H18C18.3978 6 18.7794 6.15804 19.0607 6.43934C19.342 6.72065 19.5 7.10218 19.5 7.5V17.6836C19.5 19.5371 17.9346 21 16.125 21H3.375C1.54329 21 0 19.4567 0 17.625V7.5C0 7.10217 0.158036 6.72064 0.43934 6.43934ZM18 7.5H1.5L1.5 17.625C1.5 18.6283 2.37171 19.5 3.375 19.5H16.125C17.1504 19.5 18 18.6651 18 17.6836V7.5Z" fill="#42D2B8"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M9.75 1.5C8.75544 1.5 7.80161 1.89509 7.09835 2.59835C6.39509 3.30161 6 4.25544 6 5.25V6.75C6 7.16421 5.66421 7.5 5.25 7.5C4.83579 7.5 4.5 7.16421 4.5 6.75V5.25C4.5 3.85761 5.05312 2.52226 6.03769 1.53769C7.02226 0.553124 8.35761 0 9.75 0C11.1424 0 12.4777 0.553123 13.4623 1.53769C14.4469 2.52226 15 3.85761 15 5.25V6.75C15 7.16421 14.6642 7.5 14.25 7.5C13.8358 7.5 13.5 7.16421 13.5 6.75V5.25C13.5 4.25544 13.1049 3.30161 12.4017 2.59835C11.6984 1.89509 10.7446 1.5 9.75 1.5Z" fill="#42D2B8"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M5.25 8.25C5.66421 8.25 6 8.58579 6 9V9.75C6 10.7446 6.39509 11.6984 7.09835 12.4017C7.80161 13.1049 8.75544 13.5 9.75 13.5C10.7446 13.5 11.6984 13.1049 12.4017 12.4017C13.1049 11.6984 13.5 10.7446 13.5 9.75V9C13.5 8.58579 13.8358 8.25 14.25 8.25C14.6642 8.25 15 8.58579 15 9V9.75C15 11.1424 14.4469 12.4777 13.4623 13.4623C12.4777 14.4469 11.1424 15 9.75 15C8.35761 15 7.02226 14.4469 6.03769 13.4623C5.05312 12.4777 4.5 11.1424 4.5 9.75V9C4.5 8.58579 4.83579 8.25 5.25 8.25Z" fill="#42D2B8"/>
  </svg>
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
  <path fillRule="evenodd" clipRule="evenodd" d="M0.43934 6.43934C0.720644 6.15804 1.10217 6 1.5 6H18C18.3978 6 18.7794 6.15804 19.0607 6.43934C19.342 6.72065 19.5 7.10218 19.5 7.5V17.6836C19.5 19.5371 17.9346 21 16.125 21H3.375C1.54329 21 0 19.4567 0 17.625V7.5C0 7.10217 0.158036 6.72064 0.43934 6.43934ZM18 7.5H1.5L1.5 17.625C1.5 18.6283 2.37171 19.5 3.375 19.5H16.125C17.1504 19.5 18 18.6651 18 17.6836V7.5Z" fill="#D3D3D3"/>
  <path fillRule="evenodd" clipRule="evenodd" d="M9.75 1.5C8.75544 1.5 7.80161 1.89509 7.09835 2.59835C6.39509 3.30161 6 4.25544 6 5.25V6.75C6 7.16421 5.66421 7.5 5.25 7.5C4.83579 7.5 4.5 7.16421 4.5 6.75V5.25C4.5 3.85761 5.05312 2.52226 6.03769 1.53769C7.02226 0.553124 8.35761 0 9.75 0C11.1424 0 12.4777 0.553123 13.4623 1.53769C14.4469 2.52226 15 3.85761 15 5.25V6.75C15 7.16421 14.6642 7.5 14.25 7.5C13.8358 7.5 13.5 7.16421 13.5 6.75V5.25C13.5 4.25544 13.1049 3.30161 12.4017 2.59835C11.6984 1.89509 10.7446 1.5 9.75 1.5Z" fill="#D3D3D3"/>
  <path fillRule="evenodd" clipRule="evenodd" d="M5.25 8.25C5.66421 8.25 6 8.58579 6 9V9.75C6 10.7446 6.39509 11.6984 7.09835 12.4017C7.80161 13.1049 8.75544 13.5 9.75 13.5C10.7446 13.5 11.6984 13.1049 12.4017 12.4017C13.1049 11.6984 13.5 10.7446 13.5 9.75V9C13.5 8.58579 13.8358 8.25 14.25 8.25C14.6642 8.25 15 8.58579 15 9V9.75C15 11.1424 14.4469 12.4777 13.4623 13.4623C12.4777 14.4469 11.1424 15 9.75 15C8.35761 15 7.02226 14.4469 6.03769 13.4623C5.05312 12.4777 4.5 11.1424 4.5 9.75V9C4.5 8.58579 4.83579 8.25 5.25 8.25Z" fill="#D3D3D3"/>
</svg>
  )
}

function IconUser({isActive}:{isActive:boolean}) {
  if(isActive){
    return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
    <path fillRule="evenodd" clipRule="evenodd" d="M9.76324 0C6.84093 0 4.67128 2.29407 4.89021 5.3044C5.09124 8.06556 7.20651 10.5 9.76324 10.5C12.3207 10.5 14.4316 8.06432 14.6362 5.3054C14.8554 2.34594 12.6903 0 9.76324 0ZM9.76324 1.5C7.71681 1.5 6.23022 3.04971 6.38626 5.1956C6.54619 7.39191 8.19497 9 9.76324 9C11.3308 9 12.9773 7.39219 13.1403 5.19454C13.296 3.09154 11.8049 1.5 9.76324 1.5Z" fill="#42D2B8"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M0.0288036 19.1138C0.882516 14.3802 5.45895 12 9.75002 12C14.0411 12 18.6175 14.3802 19.4717 19.1137C19.5485 19.5395 19.4739 19.9953 19.2214 20.3641C18.9573 20.7498 18.522 21 18 21H1.50002C0.978028 21 0.542897 20.7496 0.278997 20.364C0.0266282 19.9953 -0.0480094 19.5395 0.0288036 19.1138ZM9.75002 13.5C5.88484 13.5 2.18315 15.6198 1.50499 19.38C1.49769 19.4204 1.49913 19.4543 1.50383 19.4789C1.50547 19.4875 1.5074 19.4945 1.50927 19.5H17.9912C17.9931 19.4945 17.995 19.4874 17.9967 19.4788C18.0014 19.4542 18.0028 19.4205 17.9955 19.3801C17.3169 15.6198 13.6152 13.5 9.75002 13.5Z" fill="#42D2B8"/>
  </svg>
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
  <path fillRule="evenodd" clipRule="evenodd" d="M9.76324 0C6.84093 0 4.67128 2.29407 4.89021 5.3044C5.09124 8.06556 7.20651 10.5 9.76324 10.5C12.3207 10.5 14.4316 8.06432 14.6362 5.3054C14.8554 2.34594 12.6903 0 9.76324 0ZM9.76324 1.5C7.71681 1.5 6.23022 3.04971 6.38626 5.1956C6.54619 7.39191 8.19497 9 9.76324 9C11.3308 9 12.9773 7.39219 13.1403 5.19454C13.296 3.09154 11.8049 1.5 9.76324 1.5Z" fill="#D3D3D3"/>
  <path fillRule="evenodd" clipRule="evenodd" d="M0.0288036 19.1138C0.882516 14.3802 5.45895 12 9.75002 12C14.0411 12 18.6175 14.3802 19.4717 19.1137C19.5485 19.5395 19.4739 19.9953 19.2214 20.3641C18.9573 20.7498 18.522 21 18 21H1.50002C0.978028 21 0.542897 20.7496 0.278997 20.364C0.0266282 19.9953 -0.0480094 19.5395 0.0288036 19.1138ZM9.75002 13.5C5.88484 13.5 2.18315 15.6198 1.50499 19.38C1.49769 19.4204 1.49913 19.4543 1.50383 19.4789C1.50547 19.4875 1.5074 19.4945 1.50927 19.5H17.9912C17.9931 19.4945 17.995 19.4874 17.9967 19.4788C18.0014 19.4542 18.0028 19.4205 17.9955 19.3801C17.3169 15.6198 13.6152 13.5 9.75002 13.5Z" fill="#D3D3D3"/>
</svg>
  )
}