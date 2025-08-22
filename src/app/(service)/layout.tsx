'use client'

import ServiceNavigator from "@/components/molecule/(service)/Navigator"

export default function ServiceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-screen bg-bg-color pb-[49px] overflow-hidden">
      {children}
      <ServiceNavigator />
    </div>
  )
}
