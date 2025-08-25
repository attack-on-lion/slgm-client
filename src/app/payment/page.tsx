'use client';

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const code = searchParams.get('code');
    const gifticonId = searchParams.get('gifticonId');

    if (code && gifticonId) {
      processPayment(code, gifticonId);
    } else {
      setStatus('error');
      setMessage('잘못된 접근입니다.');
    }
  }, [searchParams]);

  const processPayment = async (code: string, gifticonId: string) => {
    try {
      setStatus('loading');
      setMessage('결제 처리 중...');

      const response = await fetch('/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          gifticonId: parseInt(gifticonId)
        })
      });

      if (response.ok) {
        setStatus('success');
        setMessage('기프티콘 사용이 완료되었습니다!');
        
        // 3초 후 성공 페이지로 리다이렉트 (파라미터 포함)
        setTimeout(() => {
          const successUrl = `/payment/success?code=${code}&gifticonId=${gifticonId}`;
          window.location.href = successUrl;
        }, 3000);
      } else {
        setStatus('error');
        setMessage('결제 처리에 실패했습니다.');
      }
    } catch (error) {
      console.error('결제 처리 오류:', error);
      setStatus('error');
      setMessage('네트워크 오류가 발생했습니다.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#DDF6F2] to-white flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-lg">
        {status === 'loading' && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#42D2B8] mx-auto mb-4"></div>
            <h1 className="text-xl font-bold text-gray-800 mb-2">결제 처리 중</h1>
            <p className="text-gray-600">{message}</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-gray-800 mb-2">결제 성공!</h1>
            <p className="text-gray-600">{message}</p>
            <p className="text-sm text-gray-500 mt-2">잠시 후 자동으로 이동합니다...</p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-gray-800 mb-2">결제 실패</h1>
            <p className="text-gray-600">{message}</p>
            <button 
              onClick={() => window.close()}
              className="mt-4 px-6 py-2 bg-[#42D2B8] text-white rounded-lg hover:bg-[#39E0D5] transition-colors"
            >
              닫기
            </button>
          </>
        )}
      </div>
    </div>
  );
}
export const dynamic = 'force-dynamic';