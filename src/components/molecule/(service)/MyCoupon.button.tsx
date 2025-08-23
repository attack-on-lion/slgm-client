import { useRouter } from "next/navigation"

export default function MyCouponButton(){
	const router=useRouter();
	return<button 
	className="bg-main leading-none px-[16px] py-[7px] text-white text-[14px] font-bold rounded-full"
	onClick={() => router.push('/my-page/coupons')}>내 쿠폰함</button>
}