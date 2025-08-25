'use client'
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "fast-jsx/util";
import { useEffect, useState } from "react";

export default function PaymentSuccessPage(){
	const router = useRouter();
	const searchParams = useSearchParams();
	const [isLoading, setIsLoading] = useState(true);

	// URL 파라미터에서 정보 가져오기
	const code = searchParams.get('code');
	const gifticonId = searchParams.get('gifticonId');
	const userId = searchParams.get('userId');

	useEffect(() => {
		// 페이지 로드 완료 후 로딩 상태 해제
		setIsLoading(false);
	}, []);

	const container = {
		display: 'flex flex-col items-center justify-center',
		size: 'w-full h-screen',
		background: 'bg-gradient-to-b from-[#DDF6F2] to-white',
		padding: 'px-[24px]',
	};

	const successCard = {
		display: 'flex flex-col items-center',
		size: 'w-full max-w-[320px]',
		background: 'bg-white',
		boundary: 'rounded-[20px]',
		padding: 'p-[32px]',
		shadow: 'shadow-[0_8px_32px_rgba(66,210,184,0.15)]',
	};

	const iconContainer = {
		display: 'flex items-center justify-center',
		size: 'w-[80px] h-[80px]',
		background: 'bg-[#42D2B8]',
		boundary: 'rounded-full',
		margin: 'mb-[24px]',
	};

	const button = {
		display: 'flex items-center justify-center',
		size: 'w-full h-[48px]',
		background: 'bg-[#42D2B8]',
		boundary: 'rounded-[12px]',
		font: 'text-[16px] font-semibold text-white',
		margin: 'mt-[32px]',
		style: 'cursor-pointer',
	};

	if (isLoading) {
		return (
			<div className={cn(container)}>
				<div className={cn(successCard)}>
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#42D2B8] mx-auto mb-4"></div>
					<p className="text-gray-600">처리 중...</p>
				</div>
			</div>
		);
	}

	return (
		<div className={cn(container)}>
			<div className={cn(successCard)}>
				<div className={cn(iconContainer)}>
					<svg width="40" height="40" viewBox="0 0 24 24" fill="none">
						<path 
							d="M9 12l2 2 4-4" 
							stroke="white" 
							strokeWidth="2" 
							strokeLinecap="round" 
							strokeLinejoin="round"
						/>
					</svg>
				</div>
				
				<h1 className="text-[24px] font-bold text-gray-800 mb-[8px]">
					기프티콘 사용 완료!
				</h1>
				
				<p className="text-[16px] text-gray-600 text-center leading-relaxed">
					기프티콘이 성공적으로 사용되었습니다.
					<br />
					즐거운 시간 보내세요!
				</p>

				{/* 디버깅용 정보 (개발 환경에서만 표시) */}
				{process.env.NODE_ENV === 'development' && (
					<div className="text-xs text-gray-400 mt-4 p-2 bg-gray-50 rounded">
						<div>Code: {code}</div>
						<div>Gifticon ID: {gifticonId}</div>
						<div>User ID: {userId}</div>
					</div>
				)}

				<button 
					onClick={() => router.push('/mainpage')}
					className={cn(button)}
				>
					메인으로 돌아가기
				</button>
			</div>
		</div>
	);
}