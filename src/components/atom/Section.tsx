import { cn } from "fast-jsx/util";

export default function Section({title,children}:{title?:string,children:React.ReactNode}){
	const container={
		display:'flex flex-col gap-y-[16px]',
		background:'bg-white',
		size:'w-full min-h-[175px]',
		padding:'p-[24px]',
	}
	return <div className={cn(container)}>
		{title && <div className='text-[20px] leading-none font-bold'>{title}</div>}
		<div>{children}</div>
	</div>
} 