'use client'
import { cn } from "fast-jsx/util";
import Image from "next/image";
import { useState, useEffect } from "react";
import QRCode from "react-qr-code";

interface QRModalProps {
  isOpen: boolean;
  onClose: () => void;
  gifticon: {
    id: number;
    gifticonName: string;
    gifticonPrice: number;
    imageUrl: string;
  };
}

export default function QRModal({
  isOpen,
  onClose,
  gifticon
}: QRModalProps) {
  const [qrData, setQrData] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen && gifticon) {
      generateQRCode();
    }
  }, [isOpen, gifticon]);

  const generateQRCode = async () => {
    setIsLoading(true);
    try {
      // QR 코드 데이터 생성
      const qrData = JSON.stringify({
        gifticonId: gifticon.id,
        gifticonName: gifticon.gifticonName,
        timestamp: new Date().toISOString(),
        code: `GIFT-${gifticon.id}-${Date.now().toString(36).toUpperCase()}`
      });
      
      setQrData(qrData);
    } catch (error) {
      console.error('QR 코드 생성 실패:', error);
      setQrData('QR 코드 생성 실패');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-[16px] p-[24px] mx-[20px] w-full max-w-[320px]">
        <div className="text-center">
          <h3 className="text-[18px] font-bold text-text mb-[16px]">
            기프티콘 사용
          </h3>
          
          <div className="flex flex-col items-center mb-[24px]">
            <div className="w-[80px] h-[80px] bg-gray-100 rounded-[12px] mb-[12px] flex items-center justify-center">
              {gifticon.imageUrl ? (
                <Image 
                  src={gifticon.imageUrl} 
                  alt={gifticon.gifticonName}
                  className="w-[60px] h-[60px] object-contain"
                  width={60}
                  height={60}
                  unoptimized
                />
              ) : (
                <div className="text-2xl">🎁</div>
              )}
            </div>
            <p className="text-[16px] font-medium text-text mb-[8px]">
              {gifticon.gifticonName}
            </p>
            <p className="text-[14px] text-gray-600">
              {gifticon.gifticonPrice.toLocaleString()}원
            </p>
          </div>

          {/* QR 코드 영역 */}
          <div className="mb-[24px]">
            {isLoading ? (
              <div className="w-[200px] h-[200px] mx-auto bg-gray-50 rounded-[8px] flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-main mx-auto mb-2"></div>
                  <p className="text-[12px] text-gray-500">QR 코드 생성 중...</p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="w-[200px] h-[200px] mx-auto bg-white rounded-[8px] p-4 border-2 border-gray-300 flex items-center justify-center">
                  <QRCode
                    value={qrData}
                    size={180}
                    level="M"
                    fgColor="#000000"
                    bgColor="#FFFFFF"
                  />
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-gray-400">
                    지점에서 QR 코드를 스캔해주세요
                  </p>
                  <p className="text-[8px] text-gray-300 mt-1">
                    코드: {qrData.split('"code":"')[1]?.split('"')[0] || 'N/A'}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="text-[12px] text-gray-500 mb-[16px]">
            * 지점에서 QR 코드를 스캔하여 기프티콘을 사용할 수 있습니다
          </div>

          <button
            onClick={onClose}
            className={cn(
              "w-full py-[12px] rounded-[8px] text-[14px] font-medium",
              "bg-main text-white"
            )}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
