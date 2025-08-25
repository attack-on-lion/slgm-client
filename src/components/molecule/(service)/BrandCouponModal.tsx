'use client'
import { useState, useEffect } from "react";
import { cn } from "fast-jsx/util";
import Image from "next/image";
import ItemCard from "@/components/organism/(service)/ItemCard";
import PurchaseModal from "@/components/molecule/(service)/PurchaseModal";
import storeApi from "@/services/api/store";
import { StoreApi } from "@/interfaces/Store";
import useSign from "@/hooks/useSign";

interface BrandCouponModalProps {
  isOpen: boolean;
  onClose: () => void;
  brand: {
    storeId: number;
    storeName: string;
    logoUrl: string;
    categoryId: number;
    categoryName: string;
  };
}

export default function BrandCouponModal({
  isOpen,
  onClose,
  brand
}: BrandCouponModalProps) {
  const { userId, userData } = useSign();
  const [gifticons, setGifticons] = useState<StoreApi['gifticonlist']>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  // 구매 모달 상태
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isPurchasing, setIsPurchasing] = useState(false);

  useEffect(() => {
    if (isOpen && brand) {
      fetchGifticons();
    }
  }, [isOpen, brand]);

  const fetchGifticons = async () => {
    setIsLoading(true);
    try {
      const response = await storeApi.getGifticonsByStoreId(brand.storeId);
      setGifticons(response.gifticonlist || []);
    } catch (error) {
      console.error('기프티콘 조회 실패:', error);
      setGifticons([]);
    } finally {
      setIsLoading(false);
    }
  };

  const convertGifticonToItem = (gifticon: any) => ({
    id: gifticon.id,
    name: gifticon.name,
    point: gifticon.price,
    imageUrl: gifticon.imageUrl,
    storeName: brand.storeName,
    storeType: '기타' as const,
    originalData: gifticon
  });

  // 상품 클릭 핸들러
  const handleItemClick = (item: any) => {
    setSelectedItem({
      name: item.name,
      price: item.point,
      imageUrl: item.imageUrl,
      type: 'gifticon' as const,
      storeName: item.storeName,
      originalData: item.originalData
    });
    setIsPurchaseModalOpen(true);
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
      
      alert('기프티콘 구매가 완료되었습니다!');
    } catch (error) {
      console.error('구매 실패:', error);
      alert('구매에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsPurchasing(false);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-[16px] mx-[20px] w-full max-w-[400px] max-h-[80vh] overflow-hidden">
          {/* 헤더 */}
          <div className="p-[24px] border-b border-gray-100">
            <div className="flex items-center justify-between mb-[16px]">
              <div className="flex items-center space-x-3">
                <div className="w-[40px] h-[40px] bg-gray-100 rounded-[8px] flex items-center justify-center">
                  {brand.logoUrl && !imageError ? (
                    <Image
                      src={brand.logoUrl}
                      alt={brand.storeName}
                      width={32}
                      height={32}
                      className="object-cover w-full h-full rounded-[6px]"
                      onError={handleImageError}
                      unoptimized
                    />
                  ) : (
                    <div className="text-lg">🏪</div>
                  )}
                </div>
                <div>
                  <h3 className="text-[18px] font-bold text-text">
                    {brand.storeName}
                  </h3>
                  <p className="text-[14px] text-gray-600">
                    {brand.categoryName}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-[32px] h-[32px] flex items-center justify-center rounded-full hover:bg-gray-100"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M18 6L6 18M6 6l12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* 컨텐츠 */}
          <div className="p-[24px] overflow-y-auto max-h-[60vh]">
            {isLoading ? (
              <div className="flex items-center justify-center py-[40px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-main"></div>
                <span className="ml-3 text-gray-600">기프티콘을 불러오는 중...</span>
              </div>
            ) : gifticons.length > 0 ? (
              <div className="space-y-4">
                <h4 className="text-[16px] font-semibold text-text mb-[20px]">
                  사용 가능한 기프티콘 ({gifticons.length}개)
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {gifticons.map((gifticon) => (
                    <div key={gifticon.id} onClick={() => handleItemClick(convertGifticonToItem(gifticon))} className="cursor-pointer">
                      <ItemCard
                        item={convertGifticonToItem(gifticon)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-[40px]">
                <div className="text-4xl mb-4">🎁</div>
                <p className="text-gray-600 mb-2">사용 가능한 기프티콘이 없습니다</p>
                <p className="text-[14px] text-gray-500">
                  다른 브랜드를 확인해보세요
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

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
    </>
  );
}
