'use client'
import ChallengeStatus from "@/components/molecule/(service)/ChallengeStatus";
import ServiceHeader from "@/components/molecule/(service)/Header";
import MyCouponButton from "@/components/molecule/(service)/MyCoupon.button";
import StoreTemplate from "@/components/template/(service)/Store";
import { cn } from "fast-jsx/util";
import { useQuery } from "@tanstack/react-query";
import storeApi from "@/services/api/store";
import Loading from "@/components/template/Loading";
import useSign from "@/hooks/useSign";

export default function Client(){
	const body={
		display:'flex flex-col gap-y-[8px]',
		background:'bg-bg-color-2',
	}

	// useSign 훅을 통해 userId 가져오기
	const { userId } = useSign();

	// API 데이터 가져오기
	const { data: gifticonData, isLoading: gifticonLoading } = useQuery({
		queryKey: ['gifticon'],
		queryFn: () => storeApi.getGifticon()
	});

	const { data: couponData, isLoading: couponLoading } = useQuery({
		queryKey: ['coupon', userId],
		queryFn: () => storeApi.getCoupon(userId || 1),
		enabled: !!userId,
	});

	const { data: storeBrandData, isLoading: storeBrandLoading } = useQuery({
		queryKey: ['storeBrand'],
		queryFn: () => storeApi.getStoreBrand()
	});

	// Gifticon을 Item으로 변환하는 함수
	const convertGifticonToItem = (gifticon: any) => ({
		storeName: "기프티콘 상점",
		name: gifticon.name,
		point: gifticon.price,
		imageUrl: gifticon.imageUrl,
		storeType: '기타' as const,
	});

	// 로딩 상태 처리
	if (gifticonLoading || couponLoading || storeBrandLoading) {
		return <Loading/>;
	}

	// 기본 데이터 (API 데이터가 없을 경우)
	const defaultItems = [{
		storeName:"추천 상점",
		name:"추천 상품 1",		
		point:1000,
		imageUrl:"/images/characters/다람쥐.png",	
		storeType:'음식점' as const,
	}];

	// API 데이터를 Item 타입으로 변환
	const items = gifticonData?.gifticonlist?.map(convertGifticonToItem) || defaultItems;
	const brandItems = storeBrandData?.stores || [];

	return <div>
		<ServiceHeader title="상품" option={{isBack:true}} />
		<ChallengeStatus
				button={<MyCouponButton/>}
				version="v1"
			/>
		<div className={cn(body)}>
			<StoreTemplate.Recommend items={items}/>
		</div>
		<StoreTemplate.OverView items={items} brandItems={brandItems}/>
	</div>
}