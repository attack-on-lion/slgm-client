import { OnClick } from "fast-jsx/interface";
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
	}
	const router = useRouter()
	return <div className={cn(container)}>
		<div className='relative flex justify-center w-full h-[20px]'>
			{option?.isBack && <BackButton onClick={()=>router.back()}/>}
			<div className='text-[20px] leading-none font-bold'>{title}</div>
		</div>
	</div>

}

function BackButton({onClick}:{onClick:OnClick<boolean>}){
return <button onClick={()=>onClick(false)} className="absolute left-0 w-[19px] h-[19px]">
	<svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
		<path fillRule="evenodd" clipRule="evenodd" d="M6.26724 10.0943C6.09613 9.93934 6 9.72923 6 9.51015C6 9.29107 6.09613 9.08097 6.26724 8.92603L11.4307 4.25223C11.5149 4.17332 11.6156 4.11038 11.727 4.06708C11.8383 4.02378 11.9581 4.00098 12.0793 4.00003C12.2005 3.99908 12.3207 4.01998 12.4329 4.06152C12.545 4.10307 12.647 4.16441 12.7327 4.24199C12.8184 4.31956 12.8861 4.41181 12.932 4.51335C12.9779 4.61488 13.001 4.72368 13 4.83338C12.9989 4.94308 12.9737 5.05149 12.9259 5.15229C12.8781 5.25309 12.8085 5.34426 12.7213 5.42047L8.2032 9.51015L12.7213 13.5998C12.8876 13.7557 12.9796 13.9644 12.9775 14.181C12.9755 14.3976 12.8795 14.6048 12.7102 14.758C12.541 14.9112 12.3121 14.9981 12.0727 15C11.8334 15.0019 11.6029 14.9186 11.4307 14.7681L6.26724 10.0943Z" fill="#7B7B7B"/>
	</svg>
</button>
}