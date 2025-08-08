'use client'

import ServiceNavigator from "@/components/molecule/(service)/Navigator.molecule"

export default function ServiceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div >
      {children}
      <ServiceNavigator />
    </div>
  )
}
