'use client'
import ServiceHeader from "@/components/molecule/(service)/Header";
import MyPageCharacterTemplate from "@/components/template/(service)/MyPage.character";
import { cn } from "fast-jsx/util";

const characters=[
	'다람쥐',
	'고양이',
	'쥐돌이',
	'갱쥐'
]

export default function Client(){
	const body={
		display:'flex flex-col gap-y-[8px]',
		background:'bg-bg-color-2',
	}
	return <div  >
		<ServiceHeader title="캐릭터 상점" option={{isBack:true}}/>
		<div className={cn(body)}>
			<MyPageCharacterTemplate.MyCharacter
				characters={characters.map((character,index)=>({
					id:index,
					name:character,
					imageUrl:`/images/characters/${character}.png`,
					isHave:true,
					price:10000,
				})) 
				}
			/>
			<MyPageCharacterTemplate.CharacterList point={10000} characters={[
				'다람쥐 얼굴',
				'고양이 얼굴',
				'쥐돌이 웃는얼굴',
				'갱쥐 웃는얼굴',
			].map((character,index)=>({
					id:index,
					name:character,
					imageUrl:`/images/characters/${character}.png`,
					isHave:false,
					price:10000,
				})) 
				}/>
		</div>
	</div>
}