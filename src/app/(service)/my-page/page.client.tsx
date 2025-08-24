'use client'
import ServiceHeader from "@/components/molecule/(service)/Header";
import MyPageTemplate from "@/components/template/(service)/MyPage"; 
import MyPageDetail from "@/components/organism/(service)/MyPage.detail";
import { cn } from "fast-jsx/util";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import characterApi from "@/services/api/character";
import storeApi from "@/services/api/store";
import Loading from "@/components/template/Loading";

export default function Client(){
	const [isDetail, setIsDetail] = useState<boolean>(false);
	const body={
		display:'flex flex-col gap-y-[8px]',
		background:'bg-bg-color-2',
	}

	// API 데이터 가져오기
	const { data: characterData, isLoading: characterLoading } = useQuery({
		queryKey: ['character'],
		queryFn: () => characterApi.getCharacter(),
	});

	const { data: userCharacterData, isLoading: userCharacterLoading } = useQuery({
		queryKey: ['userCharacter'],
		queryFn: () => characterApi.getCharacterByUserId(1), // userId는 임시로 1 사용
	});

	const { data: couponData, isLoading: couponLoading } = useQuery({
		queryKey: ['coupon'],
		queryFn: () => storeApi.getCoupon(1), // userId는 임시로 1 사용
	});

	// 로딩 상태 처리
	if (characterLoading || userCharacterLoading || couponLoading) {
		return <Loading/>;
	}

	// 기본 데이터 (API 데이터가 없을 경우)
	const defaultCharacter = {
		imageUrl:"/images/characters/다람쥐.png",
		name:"다람이",
	};

	const defaultHistories = [{
		name:"캐릭터 구매",
		date:new Date(),
		howLong:10,
		point:1000,
	}];

	return <div>
		<ServiceHeader title="마이페이지" option={{isBack:true}} />
		<div className={cn(body)}>
			<MyPageTemplate.Point 
				howMuchChallenge={10} 
				point={1000} 
				button={<button onClick={() => setIsDetail(!isDetail)}>자세히 보기</button>} 
			/>
			<MyPageTemplate.Character character={userCharacterData?.items?.[0] || defaultCharacter} />
			<MyPageTemplate.Config />
			<MyPageDetail 
				state={[isDetail, setIsDetail]} 
				histories={defaultHistories} 
			/>
		</div>
	</div>
}