'use client'
import ServiceHeader from "@/components/molecule/(service)/Header";
import MyPageTemplate from "@/components/template/(service)/MyPage"; 
import MyPageDetail from "@/components/organism/(service)/MyPage.detail";
import { cn } from "fast-jsx/util";
import { useState } from "react";

export default function Client(){
	const [isDetail, setIsDetail] = useState<boolean>(false);
	const body={
		display:'flex flex-col gap-y-[8px]',
		background:'bg-bg-color-2',
	}
	return <div>
		<ServiceHeader title="마이페이지" option={{isBack:true}} />
		<div className={cn(body)}>
			<MyPageTemplate.Point 
				howMuchChallenge={10} 
				point={1000} 
				button={<button onClick={() => setIsDetail(!isDetail)}>자세히 보기</button>} 
			/>
			<MyPageTemplate.Character character={{
				imageUrl:"/images/characters/다람쥐.png",
				name:"다람이",
			}} />
			<MyPageTemplate.Config />
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
		</div>
	</div>
}