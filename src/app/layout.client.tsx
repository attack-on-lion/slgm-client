'use client'
import Splash from '@/components/template/Splash';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { cn } from 'fast-jsx/util'
import { useState } from 'react'

const client =new QueryClient();

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showSplash, setShowSplash] = useState(true)
	const container={
    position:'relative',
		className: 'flex flex-col items-center',
    background:'bg-main/30 backdrop-blur-[10px]',
    size:'w-screen min-h-screen',
	}
  const body={
    size:'w-full h-screen max-w-[393px]',
    overflow:'overflow-y-scroll',
  }
  return <QueryClientProvider client={client}>
    {showSplash ? (
      <Splash onFinish={() => setShowSplash(false)} />
    ) : (
      <div className={cn(container)}>
        <div className={cn(body)}>
          {children}
        </div>
      </div>
    )}
	</QueryClientProvider>;
}