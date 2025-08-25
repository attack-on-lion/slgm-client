'use client'

import ServiceHeader from "@/components/molecule/(service)/Header"
import Card from "@/components/organism/(service)/ItemCard"
import QRModal from "@/components/molecule/(service)/QRModal"
import { State } from "fast-jsx/interface"
import { cn } from "fast-jsx/util"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import storeApi from "@/services/api/store"
import Loading from "@/components/template/Loading"
import { CouponApi } from "@/interfaces/Store"
import useSign from "@/hooks/useSign"
import { useRouter } from "next/navigation"

type SelectType="available" | "used"
const selectTypeLabel={
	available:'사용 가능',
	used:'사용 완료',
}

export default function Client(){
	const [selected,setSelected] = useState<SelectType>('available')
	const [isQRModalOpen, setIsQRModalOpen] = useState(false)
	const [selectedGifticon, setSelectedGifticon] = useState<CouponApi['ownedGifticonList'][0] | null>(null)
	const router = useRouter();
	
	// useSign 훅을 통해 userId 가져오기
	const { userId } = useSign();

	// API 데이터 가져오기
	const { data: couponData, isLoading } = useQuery({
		queryKey: ['coupon', userId],
		queryFn: () => storeApi.getCoupon(userId || 1),
		enabled: !!userId, // userId가 있을 때만 쿼리 실행
	});

	// 로딩 상태 처리
	if (isLoading) {
		return <Loading/>;
	}

	// CouponApi 인터페이스에 맞춰 데이터 처리
	const gifticonList = couponData?.ownedGifticonList || [];
	
	// usedAt 필드가 null이면 사용 가능, null이 아니면 사용 완료 쿠폰 구분
	const availableCoupons = gifticonList.filter(coupon => coupon.usedAt === null);
	const usedCoupons = gifticonList.filter(coupon => coupon.usedAt !== null);

	// 선택된 상태에 따라 데이터 필터링
	const filteredData = selected === 'available' ? availableCoupons : usedCoupons;

	// Coupon을 Item으로 변환하는 함수
	const convertCouponToItem = (coupon: CouponApi['ownedGifticonList'][0], isUsed: boolean) => ({
		storeName: coupon.gifticonName, // gifticonName을 storeName으로 사용
		name: coupon.gifticonName,
		point: coupon.gifticonPrice, // gifticonPrice를 point로 사용
		imageUrl: coupon.imageUrl,
		storeType: '기타' as const,
		status: (isUsed ? 'used' : undefined) as 'used' | 'expired' | undefined,
	});

	const items = filteredData.map((coupon) => convertCouponToItem(coupon, selected === 'used'));

	// 기프티콘 카드 클릭 핸들러
	const handleGifticonClick = (coupon: CouponApi['ownedGifticonList'][0]) => {
		// 사용 가능한 기프티콘만 QR 모달 열기
		if (coupon.usedAt === null) {
			setSelectedGifticon(coupon);
			setIsQRModalOpen(true);
		}
	};

	// QR 모달 닫기 핸들러
	const handleCloseQRModal = () => {
		setIsQRModalOpen(false);
		setSelectedGifticon(null);
	};

	return <div>
		<ServiceHeader title="쿠폰함" option={{
			isBack:true,
		}}/>
		<div className="pt-[20.5px] px-[24px] bg-white">
			<Selection state={[selected,setSelected]}/>
			<div className="grid grid-cols-2 gap-x-[20px] w-full min-h-[600px] pt-[27.5px] gap-y-[20px]">
			{items.length > 0 ? (
				items.map((item, index) => (
					<div 
						key={index}
						onClick={() => handleGifticonClick(filteredData[index])}
						className={selected === 'available' ? 'cursor-pointer' : ''}
					>
						<Card 
							item={item}
							status={item.status}
							option={{isBig:true}} 
						/>
					</div>
				))
			) : (
				<div className="col-span-2 flex flex-col items-center justify-center min-h-[400px] text-center">
					<div className="text-6xl mb-4">🎁</div>
					<div className="text-[18px] font-medium text-gray-600 mb-2">
						{selected === 'available' ? '사용 가능한 기프티콘이 없습니다' : '사용 완료된 기프티콘이 없습니다'}
					</div>
					<div className="text-[14px] text-gray-400">
						{selected === 'available' 
							? '스토어에서 기프티콘을 구매해보세요!' 
							: '아직 사용한 기프티콘이 없습니다'
						}
					</div>
					{selected === 'available' && (
						<button 
							onClick={() => router.push('/stores')}
							className="mt-4 px-6 py-2 bg-main text-white rounded-lg text-[14px] font-medium"
						>
							스토어로 이동
						</button>
					)}
				</div>
			)}
			</div>
		</div>

		{/* QR 모달 */}
		{selectedGifticon && (
			<QRModal
				isOpen={isQRModalOpen}
				onClose={handleCloseQRModal}
				gifticon={{
					id: selectedGifticon.id,
					gifticonName: selectedGifticon.gifticonName,
					gifticonPrice: selectedGifticon.gifticonPrice,
					imageUrl: selectedGifticon.imageUrl,
				}}
			/>
		)}
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