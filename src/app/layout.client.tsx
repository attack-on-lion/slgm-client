'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { cn } from 'fast-jsx/util'
const client =new QueryClient();

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
	const container={
    position:'relative',
		className: 'flex flex-col items-center',
    size:'w-screen min-h-screen',
	}
  const body={
    size:'w-full h-screen max-w-[393px]',
    overflow:'overflow-y-scroll',
  }
  return <QueryClientProvider client={client}>
		<div className={cn(container)}>
      <div className={cn(body)}>
        {children}
      </div>
    </div>
	</QueryClientProvider>;
}