'use client'
import ServiceHeader from "@/components/molecule/(service)/Header";
import MyPageOrganism from "@/components/organism/(service)/MyPage";
import MyPageDetail from "@/components/organism/(service)/MyPage.detail";
import MyPageCharacter from "@/components/organism/(service)/MyPage.character";
import { cn } from "fast-jsx/util";
import { useState } from "react";

export default function Client(){
	const [isDetail, setIsDetail] = useState<boolean>(false);
	const [isCharacter, setIsCharacter] = useState<boolean>(false);
	const body={
		display:'flex flex-col gap-y-[8px]',
		background:'bg-bg-color-2',
	}
	return <div>
		<ServiceHeader title="마이페이지" option={{isBack:true}} />
		<div className={cn(body)}>
			<MyPageOrganism.Point 
				howMuchChallenge={10} 
				point={1000} 
				button={<button onClick={() => setIsDetail(!isDetail)}>자세히 보기</button>} 
			/>
			<MyPageOrganism.Character character={{
				imageUrl:"/images/다람쥐.svg",
				name:"다람이",
			}} onClick={()=>setIsCharacter(true)} />
			<MyPageOrganism.Config />
			<MyPageDetail state={[isDetail, setIsDetail]} histories={[{
				name:"캐릭터 구매",
				date:new Date(),
				howLong:10,
				point:1000,
			},{
				name:"캐릭터 구매2",
				date:new Date(),
				howLong:10,
				point:1000,
			},{
				name:"캐릭터 구매3",
				date:new Date(),
				howLong:10,
				point:1000,
			}]} />
			<MyPageCharacter state={[isCharacter, setIsCharacter]} />
		</div>
	</div>
}