import SectionCard from "@/components/atom/Section";
import ChallengeStatus from "@/components/molecule/(service)/ChallengeStatus";
import { OnClick } from "fast-jsx/interface";
import { cn } from "fast-jsx/util";
import Image from "next/image";

function Point({howMuchChallenge,point, button}:{howMuchChallenge:number,point:number, button:React.ReactNode}){
	return <SectionCard title="포인트">
		<ChallengeStatus 
		howMuchChallenge={howMuchChallenge} 
		point={point} 
		button={button} 
		version="v2"
		/>
	</SectionCard>
}

function Character({character, onClick}:{character?:{
	imageUrl:string,
	name:string,
}, onClick:OnClick<boolean>}){
	const cardBox={
		display:'flex flex-col gap-y-[22px] items-center justify-center',
		size:'w-[345px] h-[262px]',
		rounded:"rounded-[20px]",
		boxShadow:"shadow-[0_2px_10px_0_rgba(0,0,0,0.1)]",
	} 
	return <SectionCard title="캐릭터">
		<div onClick={()=>onClick()} className={cn(cardBox)}>
			<Image src={character?.imageUrl||''} 
			alt="character" 
			width={141} 
			height={141} 
			/>
			<div className="text-[20px] leading-none font-bold">{character?.name}</div>
		</div>
	</SectionCard>
}

function Config(){
	const items=[{
		label:'내 세부정보 수정'
	},{
		label:'내 카드 설정'
	},{
		label:'알림'
	},{
		label:'FAQ'
	}]
		
	return 	<SectionCard title="설정">
			<div className="flex flex-col gap-y-[5px]">
				{items.map((item)=>(
					<div key={item.label} className="py-[5px]">{item.label}</div>
				))}
			</div>
		</SectionCard>
}

const MyPageTemplate={
	Point,
	Character,
	Config,
}
export default MyPageTemplate;