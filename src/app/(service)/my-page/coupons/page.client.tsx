'use client'

import ServiceHeader from "@/components/molecule/(service)/Header"
import Card from "@/components/organism/(service)/ItemCard"
import { State } from "fast-jsx/interface"
import { cn } from "fast-jsx/util"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import storeApi from "@/services/api/store"
import Loading from "@/components/template/Loading"

type SelectType="available" | "used"
const selectTypeLabel={
	available:'사용 가능',
	used:'사용 완료',
}
export default function Client(){
	const [selected,setSelected] = useState<SelectType>('available')

	// API 데이터 가져오기
	const { data: couponData, isLoading } = useQuery({
		queryKey: ['coupon'],
		queryFn: () => storeApi.getCoupon(1), // userId는 임시로 1 사용
	});

	// 로딩 상태 처리
	if (isLoading) {
		return <Loading/>;
	}

	// 선택된 상태에 따라 데이터 필터링
	const filteredData = selected === 'available' 
		? couponData?.AVAILABLE || []
		: couponData?.USED || [];

	// Coupon을 Item으로 변환하는 함수
	const convertCouponToItem = (coupon: any, isUsed: boolean) => ({
		storeName: coupon.storeName,
		name: coupon.name,
		point: 0, // 쿠폰은 포인트가 없으므로 0
		imageUrl: coupon.imageUrl,
		storeType: '기타' as const,
		status: (isUsed ? 'used' : 'expired') as 'used' | 'expired', // 사용 완료된 쿠폰은 'used', 만료된 쿠폰은 'expired'
	});

	// 기본 데이터 (API 데이터가 없을 경우)
	const defaultItems = [{
		storeName:'카페',
		name:'카페 쿠폰',
		point:1000,
		imageUrl:'/images/characters/다람쥐.png',
		storeType:'카페' as const,
		status: (selected === 'used' ? 'used' : 'expired') as 'used' | 'expired',
	}];

	const items = filteredData.length > 0 
		? filteredData.map((coupon) => convertCouponToItem(coupon, selected === 'used'))
		: defaultItems;

	return <div>
		<ServiceHeader title="쿠폰함" option={{
			isBack:true,
		}}/>
		<div className="pt-[20.5px] px-[24px] bg-white">
			<Selection state={[selected,setSelected]}/>
			<div className="grid grid-cols-2 gap-x-[20px] w-full h-full pt-[27.5px] gap-y-[20px]">
			{items.map((item, index) => (
				<Card 
					item={item}
					status={item.status}
					option={{isBig:true}} 
					key={index}
				/>
			))}
			</div>
		</div>
	</div>
}

function Selection({state}:{state:State<SelectType>}){
	const [selected,setSelected]=state;
	const container={
		display:'flex',
		size:'w-full h-[43px]',
	}
	const buttonBox=(type:SelectType)=>({
		size:'flex-1 h-full w-full',
		text:'text-[16px]',
		selected:selected === type ? 'text-text' : 'text-sub-title-2',
		underline:selected === type ? 'border-b-2 border-text' : 'border-b-2 border-transparent'
	})
	return <div className={cn(container)}>
		{		['available','used'].map((type)=>(
					<button className={cn(buttonBox(type as SelectType))} onClick={()=>setSelected(type as SelectType)} key={type}>
						{selectTypeLabel[type as SelectType]}
					</button>
				))}
	</div>
}