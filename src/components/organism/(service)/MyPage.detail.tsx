'use client'
import { cn } from "fast-jsx/util"
import { State } from "fast-jsx/interface"
import ChallengeStatus from "@/components/molecule/(service)/ChallengeStatus"
import Section from "@/components/atom/Section"
import MyCouponButton from "@/components/molecule/(service)/MyCoupon.button"
import { useRouter } from "next/navigation"

interface History{
	name:string,
	date:Date,
	howLong:number,
	point:number,
}

export default function MyPageDetail({state,histories}:{state:State<boolean>,histories:History[]}){
	const [isDetail, setIsDetail] = state;
	const router = useRouter();
	const container={
		position:"absolute z-40",
		display:'flex flex-col gap-y-[8px]',
		location: isDetail ? "bottom-0" : "-bottom-full",
		size:'w-full h-screen',
		transition:"transition-all duration-300",
		background:"bg-bg-color-2",
	}
	const buttonBox={
		display:'flex items-center justify-center',
		size:'w-[162px] h-[49px]',
		border:'border-1 border-sub-title-3 rounded-[13px]',
	}
	const historyBox=(isFirst:boolean)=>({
		display:'flex justify-between items-center',
		size:'w-[345px] h-[63px]',
		padding:'px-[8px]',
		border: !isFirst&&"border-t-1 border-stroke"
	})
	return <div  onClick={()=>setIsDetail(!isDetail)} className={cn(container)}>
	 <Section>
		<div className="flex flex-col gap-y-[20px] pt-[69px]">
			<ChallengeStatus
				howMuchChallenge={10} 
				point={1000} 
				button={<MyCouponButton/>} 
				version="v2"
			/>
			<div className="flex gap-x-[22px]">
				<button 
				className={cn(buttonBox)}
				onClick={()=>{
					router.push('/my-page/characters')
				}}
				>캐릭터 구매하기</button>
				<button className={cn(buttonBox)}>포인트</button>
			</div>
			</div>
	</Section>
	<Section title="포인트 내역">
		<div className="flex flex-col">
			{histories.map((history)=>(
				 <div key={history.name} className={cn(historyBox(histories[0]===history))}>
					<div className="flex flex-col gap-y-[4px]">
						<div className="text-[16px] leading-none font-bold">{history.name}</div>
						<div className="text-sub-title text-[12px]">{history.date.toLocaleDateString()}</div>
					</div>
					<div className="flex flex-col gap-y-[4px]">
						<div className="text-main text-[12px]">{history.howLong}일</div>
						<div className="text-[16px] leading-none font-bold">{history.point.toLocaleString()} p</div>
					</div>
				</div>
			))}
		</div>
	</Section>
	</div>
}