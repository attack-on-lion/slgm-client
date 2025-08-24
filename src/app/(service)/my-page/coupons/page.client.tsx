'use client'

import ServiceHeader from "@/components/molecule/(service)/Header"
import Card from "@/components/organism/(service)/ItemCard"
import { State } from "fast-jsx/interface"
import { cn } from "fast-jsx/util"
import { useState } from "react"

type SelectType="available" | "used"
const selectTypeLabel={
	available:'사용 가능',
	used:'사용 완료',
}
export default function Client(){
	const [selected,setSelected] = useState<SelectType>('available')
	return <div>
		<ServiceHeader title="쿠폰함" option={{
			isBack:true,
		}}/>
		<div className="pt-[20.5px] px-[24px] bg-white">
			<Selection state={[selected,setSelected]}/>
			<div className="grid grid-cols-2 gap-x-[20px] w-full h-full pt-[27.5px] gap-y-[20px]">
			{[...Array(10)].map((_,index)=><Card item={{
				storeName:'카페',
				name:'카페 쿠폰',
				point:1000,
				imageUrl:'/images/characters/다람쥐.png',
				storeType:'카페',
			}}  status={selected==='used'?'used':'expired'}
			option={{isBig:true}} key={index}/>
			)}
			</div>
		</div>
	</div>
}

function Selection({state}:{state:State<SelectType>}){
	const [selected,setSelected]=state;
	const container={
		display:'flex',
		size:'w-full h-[43px]',
	}
	const buttonBox=(type:SelectType)=>({
		size:'flex-1 h-full w-full',
		text:'text-[16px]',
		selected:selected === type ? 'text-text' : 'text-sub-title-2',
		underline:selected === type ? 'border-b-2 border-text' : 'border-b-2 border-transparent'
	})
	return <div className={cn(container)}>
		{		['available','used'].map((type)=>(
					<button className={cn(buttonBox(type as SelectType))} onClick={()=>setSelected(type as SelectType)} key={type}>
						{selectTypeLabel[type as SelectType]}
					</button>
				))}
	</div>
}