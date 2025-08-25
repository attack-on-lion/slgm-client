import Section from "@/components/atom/Section";
import Card from "@/components/organism/(service)/ItemCard";
import BrandCard from "@/components/organism/(service)/BrandCard";
import { Item, StoreType, storeTypes, StoreBrandApi } from "@/interfaces/Store";
import { cn } from "fast-jsx/util";
import { useState } from "react";

function Recommend({items, onItemClick}:{items:Item[], onItemClick?: (item: Item) => void}){
	return <Section title="추천 상품" option={{smallTitle:true,noPadding:true}}>
		<div className="flex gap-x-[20px] w-full h-full bg-bg-color-2 px-[24px] py-[20px] overflow-x-scroll">
			{items.map((item, index)=>(
				<div key={index} onClick={() => onItemClick?.(item)} className="cursor-pointer">
					<Card item={item} />
				</div>
			))}
		</div>
	</Section>
}

type StoreBrand="상품권" | "브랜드"
function OverView({items, brandItems, onItemClick}:{items:Item[], brandItems:StoreBrandApi['stores'], onItemClick?: (item: Item) => void}){
	const [selectedStoreType,setSelectedStoreType]=useState<StoreType>('전체');
	const [selectedStoreBrand,setSelectedStoreBrand]=useState<StoreBrand>('상품권');
	const container={
		display:'flex flex-col gap-y-[20px]',
		background:'bg-white',
		padding:'px-[24px] py-[20px]',
		overflow:'overflow-x-scroll',
	}
	const tab=(type:StoreType)=>({
		display:'flex gap-x-[12px] shrink-0',
		padding:'px-[15px] py-[8px]',
		font:'text-[13px] leading-none',
		textColor:selectedStoreType===type?'text-main':'text-sub-title-2',
		boundary:'border-1 rounded-[30px]',
		border: selectedStoreType===type?'border-main':'border-stroke',
		style:'cursor-pointer',
	})
	const brandTab=(type:StoreBrand)=>({
		display:'flex flex-1 shrink-0 justify-center items-center ',
		size:'w-full h-[44px] ',
		font:'text-[16px] leading-none',
		textColor:selectedStoreBrand===type?'text-text':'text-sub-title-2',
		boundary:'border-b-1 ',
		border: selectedStoreBrand===type?'border-text':'border-transparent',
		style:'cursor-pointer',
	})

	return( <div className={cn(container)}>
		<div className="flex justify-between shrink-0">
			{[
			'상품권','브랜드'
			].map((type)=>(
				<div key={type} className={cn(brandTab(type as StoreBrand))} onClick={()=>setSelectedStoreBrand(type as StoreBrand)}>{type}</div>
			))}
		</div>
		{selectedStoreBrand === '상품권' && (
			<>
				<div className=" w-full flex gap-x-[10px] overflow-x-scroll">
					{storeTypes.map((type)=>(
						<div key={type} className={cn(tab(type))} onClick={()=>setSelectedStoreType(type)}>{type}</div>
					))}
				</div>
				<div className="grid grid-cols-2 gap-x-[20px] w-full min-h-[256px] py-[20px] overflow-x-scroll">
					{items.filter((item) => selectedStoreType === '전체' || item.storeType === selectedStoreType).map((item, index)=>(
						<div key={index} onClick={() => onItemClick?.(item)} className="cursor-pointer">
							<Card item={item} option={{isBig:true}} />
						</div>
					))}
				</div>
			</>
		)}
		{selectedStoreBrand === '브랜드' && (
			<div className="grid grid-cols-2 gap-x-[20px] w-full min-h-[256px] py-[20px] overflow-x-scroll">
				{brandItems.map((brand, index)=>(
					<div key={index}>
						<BrandCard brand={brand} option={{isBig:true}} />
					</div>
				))}
			</div>
		)}
	</div>)
}

const StoreTemplate={
	Recommend,
	OverView,
}
export default StoreTemplate;