'use client';

import { useSearchParams, useRouter } from "next/navigation";

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const message = searchParams.get('message') || '알 수 없는 오류가 발생했습니다.';
  const errorLog = searchParams.get('errorLog') || '';

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#DDF6F2] to-white flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-lg">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        
        <h1 className="text-xl font-bold text-gray-800 mb-2">오류 발생</h1>
        <p className="text-gray-600 mb-4">{message}</p>
        
        {errorLog && (
          <div className="mb-6 text-left">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">에러 로그:</h3>
            <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-600 font-mono overflow-x-auto">
              <pre className="whitespace-pre-wrap break-words">{errorLog}</pre>
            </div>
          </div>
        )}
        
        <div className="space-y-3">
          <button 
            onClick={() => router.back()}
            className="w-full px-6 py-3 bg-[#42D2B8] text-white rounded-lg hover:bg-[#39E0D5] transition-colors"
          >
            이전 페이지로 돌아가기
          </button>
          <button 
            onClick={() => router.push('/mainpage')}
            className="w-full px-6 py-3 bg-white border border-[#42D2B8] text-[#42D2B8] rounded-lg hover:bg-[#DDF6F2] transition-colors"
          >
            메인으로 이동
          </button>
        </div>
      </div>
    </div>
  );
}
