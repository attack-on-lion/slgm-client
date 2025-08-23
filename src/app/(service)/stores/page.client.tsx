'use client'
import ChallengeStatus from "@/components/molecule/(service)/ChallengeStatus";
import ServiceHeader from "@/components/molecule/(service)/Header";
import MyCouponButton from "@/components/molecule/(service)/MyCoupon.button";
import StoreTemplate from "@/components/template/(service)/Store";
import { cn } from "fast-jsx/util";

export default function Client(){
	const body={
		display:'flex flex-col gap-y-[8px]',
		background:'bg-bg-color-2',
	}
	return <div>
		<ServiceHeader title="상품" option={{isBack:true}} />
		<ChallengeStatus
				howMuchChallenge={10}
				point={1000}
				button={<MyCouponButton/>}
				version="v1"
			/>
		<div className={cn(body)}>
			<StoreTemplate.Recommend items={[{
				storeName:"추천 상점",
				name:"추천 상품",
				point:"1000",
				imageUrl:"/images/다람쥐.svg",
			},{
				storeName:"추천 상점",
				name:"추천 상품",
				point:"1000",
				imageUrl:"/images/다람쥐.svg",
			},{
				storeName:"추천 상점",
				name:"추천 상품",
				point:"1000",
				imageUrl:"/images/다람쥐.svg",
			}, {
				storeName:"추천 상점",
				name:"추천 상품",
				point:"1000",
				imageUrl:"/images/다람쥐.svg",
			}, ]}/>
		</div>
		<StoreTemplate.OverView items={[{
			storeName:"추천 상점",
			name:"추천 상품",
			point:"1000",
			imageUrl:"/images/다람쥐.svg",
		},{
			storeName:"추천 상점",
			name:"추천 상품",
			point:"1000",
			imageUrl:"/images/다람쥐.svg",
		},{
			storeName:"추천 상점",
			name:"추천 상품",
			point:"1000",
			imageUrl:"/images/다람쥐.svg",
		},{
			storeName:"추천 상점",
			name:"추천 상품",
			point:"1000",
			imageUrl:"/images/다람쥐.svg",
		},{
			storeName:"추천 상점",
			name:"추천 상품",
			point:"1000",
			imageUrl:"/images/다람쥐.svg",
		},{
			storeName:"추천 상점",
			name:"추천 상품",
			point:"1000",
			imageUrl:"/images/다람쥐.svg",
		},]}/>
	</div>
}