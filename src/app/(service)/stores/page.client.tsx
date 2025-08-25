'use client'
import ChallengeStatus from "@/components/molecule/(service)/ChallengeStatus";
import ServiceHeader from "@/components/molecule/(service)/Header";
import MyCouponButton from "@/components/molecule/(service)/MyCoupon.button";
import StoreTemplate from "@/components/template/(service)/Store";
import PurchaseModal from "@/components/molecule/(service)/PurchaseModal";
import BrandCouponModal from "@/components/molecule/(service)/BrandCouponModal";
import { cn } from "fast-jsx/util";
import { useQuery } from "@tanstack/react-query";
import storeApi from "@/services/api/store";
import Loading from "@/components/template/Loading";
import useSign from "@/hooks/useSign";
import { useState } from "react";

export default function Client(){
	const body={
		display:'flex flex-col gap-y-[8px]',
		background:'bg-bg-color-2',
	}

	// useSign 훅을 통해 userId 가져오기
	const { userId, userData } = useSign();

	// 구매 모달 상태
	const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState<any>(null);
	const [isPurchasing, setIsPurchasing] = useState(false);

	// 브랜드 쿠폰 모달 상태
	const [isBrandCouponModalOpen, setIsBrandCouponModalOpen] = useState(false);
	const [selectedBrand, setSelectedBrand] = useState<any>(null);

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
		id: gifticon.id, // ID 추가
		storeName: "기프티콘 상점",
		name: gifticon.name,
		point: gifticon.price,
		imageUrl: gifticon.imageUrl,
		storeType: '기타' as const,
	});

	// 상품 클릭 핸들러
	const handleItemClick = (item: any) => {
		setSelectedItem({
			name: item.name,
			price: item.point,
			imageUrl: item.imageUrl,
			type: 'gifticon' as const,
			storeName: item.storeName,
			originalData: item
		});
		setIsPurchaseModalOpen(true);
	};

	// 브랜드 클릭 핸들러
	const handleBrandClick = (brand: any) => {
		setSelectedBrand(brand);
		setIsBrandCouponModalOpen(true);
	};

	// 구매 확인 핸들러
	const handlePurchaseConfirm = async () => {
		if (!selectedItem || !userId) return;

		setIsPurchasing(true);
		try {
			// 기프티콘 ID 확인
			const gifticonId = selectedItem.originalData.id;
			if (!gifticonId) {
				throw new Error('기프티콘 ID가 없습니다.');
			}

			// 기프티콘 구매 API 호출
			await storeApi.purchaseGifticon(userId, gifticonId);
			
			// 성공 시 모달 닫기
			setIsPurchaseModalOpen(false);
			setSelectedItem(null);
			
			// 쿠폰 데이터 새로고침
			// queryClient.invalidateQueries(['coupon', userId]);
			
			alert('기프티콘 구매가 완료되었습니다!');
		} catch (error) {
			console.error('구매 실패:', error);
			alert('구매에 실패했습니다. 다시 시도해주세요.');
		} finally {
			setIsPurchasing(false);
		}
	};

	// 로딩 상태 처리
	if (gifticonLoading || couponLoading || storeBrandLoading) {
		return <Loading/>;
	}

	// API 데이터를 Item 타입으로 변환
	const items = gifticonData?.gifticonlist?.map(convertGifticonToItem)??[];
	const brandItems = storeBrandData?.stores || [];

	return <div>
		<ServiceHeader title="상품" option={{isBack:true}} />
		<ChallengeStatus
				button={<MyCouponButton/>}
				version="v1"
			/>
		<div className={cn(body)}>
			<StoreTemplate.Recommend items={items} onItemClick={handleItemClick}/>
		</div>
		<StoreTemplate.OverView 
			items={items} 
			brandItems={brandItems} 
			onItemClick={handleItemClick}
			onBrandClick={handleBrandClick}
		/>

		{/* 구매 모달 */}
		{selectedItem && (
			<PurchaseModal
				isOpen={isPurchaseModalOpen}
				onClose={() => {
					setIsPurchaseModalOpen(false);
					setSelectedItem(null);
				}}
				onConfirm={handlePurchaseConfirm}
				item={selectedItem}
				userPoint={userData?.point || 0}
				isLoading={isPurchasing}
			/>
		)}

		{/* 브랜드 쿠폰 모달 */}
		{selectedBrand && (
			<BrandCouponModal
				isOpen={isBrandCouponModalOpen}
				onClose={() => {
					setIsBrandCouponModalOpen(false);
					setSelectedBrand(null);
				}}
				brand={selectedBrand}
			/>
		)}
	</div>
}