'use client'

import ServiceNavigator from "@/components/molecule/(service)/Navigator"

export default function ServiceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden">
    <div className="h-screen bg-bg-color pb-[49px] overflow-y-scroll">
      {children}
      <ServiceNavigator />
    </div>
    </div>
  )
}
