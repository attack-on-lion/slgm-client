import { Item } from "@/interfaces/Store";
import { cn } from "fast-jsx/util";
import Image from "next/image";

export interface ItemCardProps{
	item:Item,
	status?:CouponStatus,
	option?:{
		isBig?:boolean,
	}
}

export default function Card({item, status, option}:ItemCardProps){
	const {storeName, name, point, imageUrl}=item;
	const container={
		position:'relative', 
		display:'flex flex-col gap-y-[12px]',
		gap:!option?.isBig?'gap-y-[12px]':'gap-y-[16px]',
		size:!option?.isBig?'w-[120px] h-[195px]':'w-[161px] h-[243px]',
	}
	const imageContainer={
		size:!option?.isBig?'w-[120px] h-[120px]':'w-[161px] h-[161px]',
		border:'border-1 border-black/5',
		background:'bg-white',
	}
	return (<div className={cn(container)}>
		<div className={cn(imageContainer)}>
			<Image src={imageUrl} alt={name} width={option?.isBig?161:120} height={option?.isBig?161:120}   className="object-cover"/>
		</div>
		<div className="px-[8px] flex flex-col gap-y-[4px]">
			<div className="text-[12px] text-sub-title leading-none font-bold">{storeName}</div>
			<div className="text-[16px] leading-none">{name}</div>
			<div className="text-[16px] text-main leading-none">{point.toLocaleString()} p</div>
		</div>
		{status && <CouponWrapper status={status}/>}
	</div>);
}


type CouponStatus='used'|'expired'
const couponStatusLabel={
	used:'사용 완료',
	expired:'기간만료',
}
function CouponWrapper({status}:{status:CouponStatus}){
	const container={
		position:'absolute top-0 left-0',
		display:'flex justify-center items-center',
		background:'bg-white/80',
		size:'w-full h-full',
		border:'border-2',
		font:'text-[20px]',
		statusBy: status==='used'?'border-text text-text':'border-[#F30000] text-[#F30000]',
	}
	return <div className={cn(container)}>
		<div>{couponStatusLabel[status]}</div>
	</div>
}