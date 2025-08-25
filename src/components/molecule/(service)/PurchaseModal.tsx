'use client'
import { cn } from "fast-jsx/util";
import { useState } from "react";

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  item: {
    name: string;
    price: number;
    imageUrl: string;
    type?: 'character' | 'item' | 'gifticon';
    storeName?: string;
  };
  userPoint: number;
  isLoading?: boolean;
}

export default function PurchaseModal({
  isOpen,
  onClose,
  onConfirm,
  item,
  userPoint,
  isLoading = false
}: PurchaseModalProps) {
  if (!isOpen) return null;

  const canAfford = userPoint >= item.price;

  const getTitle = () => {
    switch (item.type) {
      case 'character':
        return '캐릭터 구매';
      case 'gifticon':
        return '기프티콘 구매';
      default:
        return '아이템 구매';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-[16px] p-[24px] mx-[20px] w-full max-w-[320px]">
        <div className="text-center">
          <h3 className="text-[18px] font-bold text-text mb-[16px]">
            {getTitle()}
          </h3>
          
          <div className="flex flex-col items-center mb-[24px]">
            <div className="w-[80px] h-[80px] bg-gray-100 rounded-[12px] mb-[12px] flex items-center justify-center">
              <img 
                src={item.imageUrl} 
                alt={item.name}
                className="w-[60px] h-[60px] object-contain"
              />
            </div>
            {item.storeName && (
              <p className="text-[12px] text-gray-500 mb-[4px]">
                {item.storeName}
              </p>
            )}
            <p className="text-[16px] font-medium text-text mb-[8px]">
              {item.name}
            </p>
            <p className="text-[14px] text-gray-600">
              {item.price.toLocaleString()} 포인트
            </p>
          </div>

          <div className="mb-[24px]">
            <div className="flex justify-between items-center mb-[8px]">
              <span className="text-[14px] text-gray-600">보유 포인트</span>
              <span className="text-[14px] font-medium text-text">
                {userPoint.toLocaleString()} 포인트
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[14px] text-gray-600">구매 후 포인트</span>
              <span className={cn(
                "text-[14px] font-medium",
                canAfford ? "text-text" : "text-red-500"
              )}>
                {(userPoint - item.price).toLocaleString()} 포인트
              </span>
            </div>
          </div>

          {!canAfford && (
            <p className="text-[14px] text-red-500 mb-[16px]">
              포인트가 부족합니다
            </p>
          )}

          <div className="flex gap-[12px]">
            <button
              onClick={onClose}
              disabled={isLoading}
              className={cn(
                "flex-1 py-[12px] rounded-[8px] text-[14px] font-medium",
                "border border-gray-300 text-gray-600",
                "disabled:opacity-50"
              )}
            >
              취소
            </button>
            <button
              onClick={onConfirm}
              disabled={!canAfford || isLoading}
              className={cn(
                "flex-1 py-[12px] rounded-[8px] text-[14px] font-medium",
                canAfford 
                  ? "bg-main text-white" 
                  : "bg-gray-300 text-gray-500",
                "disabled:opacity-50"
              )}
            >
              {isLoading ? "구매 중..." : "구매"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
