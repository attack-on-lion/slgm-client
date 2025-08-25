'use client'

import ServiceNavigator from "@/components/molecule/(service)/Navigator"
import useSign from "@/hooks/useSign"
import Loading from "@/components/template/Loading"
import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"

export default function ServiceLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useSign();
  const router = useRouter();
  const pathname = usePathname();

  // 로그인 상태 확인 및 리다이렉트 처리
  useEffect(() => {
    if (!isLoading && !isAuthenticated && !pathname.includes('/payment')) {
      router.push('/sign-in');
    }
  }, [isAuthenticated, isLoading, router]);

  // 로딩 중이거나 인증되지 않은 경우 로딩 화면 표시
  if (isLoading || !isAuthenticated) {
    return <Loading />;
  }

  return (
    <div className="relative overflow-hidden">
      <div className="h-screen bg-bg-color pb-[49px] overflow-y-scroll">
        {children}
        <ServiceNavigator />
      </div>
    </div>
  )
}
