'use client'
import Section from "@/components/atom/Section";
import ServiceHeader from "@/components/molecule/(service)/Header";
import { State } from "fast-jsx/interface";
import { cn } from "fast-jsx/util";

export default function MyPageCharacter({state}:{state:State<boolean>}){
	const [isCharacter, setIsCharacter] = state
	const container={
		position:'absolute z-40',
		display:'flex flex-col gap-y-[8px]',
		location:isCharacter?'bottom-0':'bottom-[-100%]',
		size:'w-full h-screen',
		transition:'transition-all duration-300',
		background:'bg-bg-color-2',
	}
	return <div onClick={()=>setIsCharacter(!isCharacter)} className={cn(container)}>
		<ServiceHeader title="캐릭터 상점" option={{isBack:true}} />
		<Section title="보유 캐릭터">
			<div>
				<div>
					
				</div>
			</div>
		</Section>
		<Section title="캐릭터">
			<div>
				<div>
					
				</div>
			</div>
		</Section>
	</div>
}