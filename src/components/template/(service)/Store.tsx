import Section from "@/components/atom/Section";
import { StoreType, storeTypes } from "@/interfaces/Store";
import { cn } from "fast-jsx/util";
import Image from "next/image";
import { useState } from "react";

interface Item{
	storeName:string,
	name:string,
	point:string,
	imageUrl:string,
}
interface ItemCardProps{
	item:Item,
	option?:{
		isBig?:boolean,
	}
}
function Card({item, option}:ItemCardProps){
	const {storeName, name, point, imageUrl}=item;
	const container={
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
			<div className="text-[16px] text-main leading-none">{point} p</div>
		</div>
	</div>);
}

function Recommend({items}:{items:Item[]}){
	return <Section title="추천 상품" option={{smallTitle:true,noPadding:true}}>
		<div className="flex gap-x-[20px] w-full h-full bg-bg-color-2 px-[24px] py-[20px] overflow-x-scroll">
			{items.map((item)=>(
				<Card key={item.name} item={item} />
			))}
		</div>
	</Section>
}
function OverView({items}:{items:Item[]}){
	const selectedStoreType=useState<StoreType>('전체');
	const container={
		display:'flex flex-col gap-y-[20px]',
		background:'bg-white',
		padding:'px-[24px] py-[20px]',
		overflow:'overflow-x-scroll',
	}
	return( <div className={cn(container)}>
		<div className="flex gap-x-[12px]">
			{storeTypes.map((type)=>(
				<div key={type} className="text-[16px] leading-none">{type}</div>
			))}
		</div>
		<div className="grid grid-cols-2 gap-x-[20px] w-full h-full py-[20px] overflow-x-scroll">
			{items.map((item)=>(
				<Card key={item.name} item={item} option={{isBig:true}} />
			))}
		</div>
	</div>)
}

const StoreTemplate={
	Recommend,
	OverView,
}
export default StoreTemplate;