import { cn } from "fast-jsx/util";

interface Props{
	title?:string,
	children:React.ReactNode,
	right?:React.ReactNode,
	option?:{
		smallTitle?:boolean,
		noPadding?:boolean,
	}
}

export default function Section({title,children,right,option}:Props){
	const container={
		display:'flex flex-col gap-y-[16px]',
		background:'bg-white',
		size:'w-full',
		padding:'pt-[24px]',
	}
	const titleBox={
		display:'flex flex-row justify-between items-center',
		styles:'leading-none font-bold',
		titleSize:option?.smallTitle?'text-[16px]':'text-[20px]',
		padding:'px-[24px]'
	}
	const body={
		padding: !option?.noPadding&&'p-[24px]',
	}
	return <div className={cn(container)}>
		{title && <div className={cn(titleBox)}>{title}
			{right && <div >{right}</div>}
			</div>}
		<div className={cn(body)}>{children}</div>
	</div>
} 