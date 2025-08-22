import { cn } from "fast-jsx/util";
import { useRouter } from "next/navigation";


export default function ServiceHeader({title,option}:{
	title:string;
	option?:{
		isBack?:boolean;
	}
}){
	const container={
		position:'relative',
		display:'flex justify-center',
		paddings:'pt-[21px] pb-[8px] px-[20px]',
		background:'bg-white',
		size:'w-full',
		border:'border-2 border-gray-200'
	}
	const router = useRouter()
	return <div className={cn(container)}>
		<div className='relative flex justify-center w-full h-[20px]'>
			{option?.isBack && <div className='absolute left-0 w-4 h-4 left-0 border-2 border-gray-200'>
				<button onClick={()=>router.back()}></button>
			</div>}
			<div className='text-[20px] leading-none'>{title}</div>
		</div>
	</div>

}