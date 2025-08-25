'use client'
import { useState } from "react";
import { cn } from "fast-jsx/util";
import { useRouter } from "next/navigation";
import useSign from "@/hooks/useSign";
import { userApi } from "@/services/api/user";
import { Logo } from "@/components/template/Splash";

export default function SignInPageClient(){
	const [id, setId] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const { setUser } = useSign();

	const handleLogin = async () => {
		if (!id.trim() || !password.trim()) {
			alert("아이디와 비밀번호를 입력해주세요.");
			return;
		}

		setIsLoading(true);
		try {
			// 시늉 로그인: userId:1인 사용자 정보 가져오기
			const userData = await userApi.getUserProfile(1);
			
			// zustand에 사용자 정보 저장
			setUser({
				...userData,
				user_id: 1
			});

			// 로그인 성공 후 메인 페이지로 이동
			router.push('/mainpage');
		} catch (error) {
			console.error('로그인 실패:', error);
			alert('로그인에 실패했습니다.');
		} finally {
			setIsLoading(false);
		}
	};

	const container = {
		display: 'flex flex-col',
		size: 'w-full h-screen',
		background: 'bg-white',
		padding: 'px-[24px]',
	};

	const logoArea = {
		display: 'flex items-center justify-center',
		size: 'w-full h-[120px]',
		margin: 'mt-[100px] mb-[40px]',
		boundary: 'rounded-[12px]',
	};

	const inputContainer = {
		display: 'flex flex-col',
		gap: 'gap-y-[20px]',
		margin: 'mb-[32px]',
	};

	const inputGroup = {
		display: 'flex flex-col',
		gap: 'gap-y-[8px]',
	};

	const inputLabel = {
		font: 'text-[14px] font-medium',
		textColor: 'text-text',
	};

	const inputField = {
		display: 'flex',
		padding: 'p-[15px]',
		flexDirection: 'flex-col',
		align: 'items-start',
		gap: 'gap-[5px]',
		alignSelf: 'self-stretch',
		boundary: 'rounded-[5px]',
		background: 'bg-[#FAFAFA]',
		font: 'text-[14px]',
		placeholder: 'placeholder:text-gray-400',
		focus: 'focus:outline-none focus:border-main',
	};

	const loginButton = {
		display: 'flex',
		padding: 'py-[15px] px-[109px]',
		justify: 'justify-center',
		align: 'items-center',
		gap: 'gap-[10px]',
		alignSelf: 'self-stretch',
		boundary: 'rounded-[400px]',
		background: 'bg-[#42D2B8]',
		font: 'text-[16px] font-medium text-white',
		disabled: 'disabled:opacity-50',
		style: 'cursor-pointer',
		margins:'mb-[30px]'
	};

	const linkContainer = {
		display: 'flex justify-end',
		gap: 'gap-x-[16px]',
		margin: 'mb-[32px]',
	};

	const linkText = {
		font: 'text-[12px]',
		textColor: 'text-gray-500',
		style: 'cursor-pointer',
	};

	const divider = {
		display: 'flex items-center',
		margin: 'mb-[32px]',
	};

	const dividerLine = {
		flex: 'flex-1',
		size: 'h-[1px]',
		background: 'bg-gray-200',
	};

	const dividerText = {
		padding: 'px-[16px]',
		font: 'text-[12px]',
		textColor: 'text-gray-400',
	};

	const socialLogin = {
		display: 'flex justify-center',
	};

	const socialButton = {
		display: 'flex items-center justify-center',
		size: 'w-[48px] h-[48px]',
		background: 'bg-[#FAD200]',
		boundary: 'rounded-full',
		style: 'cursor-pointer',
	};

	return (
		<div className={cn(container)}>
			<div className={cn(logoArea)}>
				<Logo/>
			</div>

			{/* 로그인 폼 */}
			<div className={cn(inputContainer)}>
				<div className={cn(inputGroup)}>
					<label className={cn(inputLabel)}>아이디</label>
					<input
						type="text"
						value={id}
						onChange={(e) => setId(e.target.value)}
						placeholder="아이디를 입력해 주세요"
						className={cn(inputField)}
					/>
				</div>

				<div className={cn(inputGroup)}>
					<label className={cn(inputLabel)}>비밀번호</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="비밀번호를 입력해 주세요"
						className={cn(inputField)}
					/>
				</div>
			</div>

			{/* 로그인 버튼 */}
			<button
				onClick={handleLogin}
				disabled={isLoading}
				className={cn(loginButton)}
			>
				{isLoading ? "로그인 중..." : "로그인"}
			</button>

			{/* 링크 */}
			<div className={cn(linkContainer)}>
				<span className={cn(linkText)}
				onClick={()=>alert('회원가입')}>회원가입</span>
				<span className={cn(linkText)}
				onClick={()=>alert('아이디/비밀번호 찾기')}>아이디/비밀번호 찾기</span>
			</div>

			{/* 구분선 */}
			<div className={cn(divider)}>
				<div className={cn(dividerLine)}></div>
				<span className={cn(dividerText)}>또는</span>
				<div className={cn(dividerLine)}></div>
			</div>

			{/* 소셜 로그인 */}
			<div className={cn(socialLogin)}
			onClick={handleLogin}
			>
				<div className={cn(socialButton)}>
				<svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
  <path d="M10.0586 2C5.08745 2 1.05859 5.08107 1.05859 8.88395C1.05859 11.3582 2.7663 13.5276 5.32786 14.7413C5.13996 15.4204 4.64671 17.2048 4.54723 17.5858C4.42565 18.059 4.72547 18.0536 4.92442 17.9267C5.07916 17.8264 7.39065 16.3053 8.38819 15.6489C8.92979 15.7265 9.48798 15.7679 10.0586 15.7679C15.0297 15.7679 19.0586 12.6868 19.0586 8.88395C19.0586 5.08107 15.0297 2 10.0586 2Z" fill="#1E1E1E"/>
</svg>
				</div>
			</div>
		</div>
	);
}