import Section from "@/components/atom/Section";
import CharacterCard from "@/components/organism/(service)/CharacterCard";
import { Item } from "@/interfaces/Item";
import { cn } from "fast-jsx/util";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

interface Character{
	id:number,
	name:string,
	imageUrl:string,
	price:number,
	isHave:boolean,
}

function MyCharacter({characters}:{characters:Character[]}){
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const [selectedIndex, setSelectedIndex] = useState(0);

	useEffect(() => {
		let isScrolling = false;
		let scrollTimeout: NodeJS.Timeout;

		const handleScroll = () => {
			if (!scrollContainerRef.current) return;
			
			const container = scrollContainerRef.current;
			const containerWidth = container.clientWidth;
			const scrollLeft = container.scrollLeft;
			const cardWidth = 157; // 카드 너비
			const gap = 20; // 카드 간격
			const totalCardWidth = cardWidth + gap;
			
			// 최대한 왼쪽 기준점 계산
			const offset = containerWidth * 0.1; // 10% 위치 (거의 왼쪽 끝)
			const selectionPosition = scrollLeft + offset;
			
			// 선택된 카드 인덱스 계산
			const newSelectedIndex = Math.round(selectionPosition / totalCardWidth);
			const clampedIndex = Math.max(0, Math.min(newSelectedIndex, characters.length - 1));
			
			setSelectedIndex(clampedIndex);
			
			// 스크롤 중임을 표시
			isScrolling = true;
			
			// 이전 타이머 클리어
			clearTimeout(scrollTimeout);
			
			// 스크롤이 멈춘 후 스냅 효과 적용
			scrollTimeout = setTimeout(() => {
				isScrolling = false;
				snapToCard(clampedIndex);
			}, 150); // 150ms 후 스냅
		};

		const snapToCard = (index: number) => {
			if (!scrollContainerRef.current) return;
			
			const container = scrollContainerRef.current;
			const cardWidth = 157;
			const gap = 20;
			const totalCardWidth = cardWidth + gap;
			const containerWidth = container.clientWidth;
			const offset = containerWidth * 0.1;
			
			// 해당 카드가 선택 위치에 오도록 스크롤 위치 계산
			const targetScrollLeft = index * totalCardWidth - offset;
			
			container.scrollTo({
				left: targetScrollLeft,
				behavior: 'smooth'
			});
		};

		const container = scrollContainerRef.current;
		if (container) {
			container.addEventListener('scroll', handleScroll);
			return () => {
				container.removeEventListener('scroll', handleScroll);
				clearTimeout(scrollTimeout);
			};
		}
	}, [characters.length]);

	return <Section title="보유 캐릭터" option={{smallTitle:true}}>
		<div 
			ref={scrollContainerRef}
			className="flex flex-row gap-x-[20px] items-center w-full h-[250px] overflow-x-scroll px-[24px] scroll-smooth"
		>
			{characters.map((character, index) => (
				<CharacterCard 
					isFocus={index === selectedIndex} 
					character={character} 
					key={character.id} 
				/>
			))}
		</div>
</Section>

}

function CharacterList({point, characters, onCharacterClick}:{point:number, characters:Character[], onCharacterClick?: (character: Character) => void}){
	return <Section title="캐릭터"
	 option={{smallTitle:true,}}
	 right={
		<div className="rounded-[20px] border-1 border-text text-text flex items-center py-[8px] px-[20px]">
			{point.toLocaleString()} P
		</div>
	 }>
	<div className="grid grid-cols-3 gap-[20px] justify-items-center">
		{characters.map((character)=>
		<CharacterCard.Abbreviation 
			character={character} 
			key={character.id}
			onClick={() => onCharacterClick?.(character)}
		/>)}
	</div>
</Section>
}

export interface ItemRender extends Item{
	isHave:boolean,
}
function ItemList({ 
	items, 
	onItemClick, 
	userPoint = 0 
}:{ 
	items: ItemRender[];
	onItemClick?: (item: ItemRender) => void;
	userPoint?: number;
}){
	return <Section title="아이템"
	 option={{smallTitle:true,}}
	 >
	<div className="grid grid-cols-3 gap-[20px] justify-items-center">
		{items.map((item)=>
		<CharacterCard.Abbreviation 
			character={
				{
					id:item.id,
					name:item.name,
					imageUrl:item.imageUrl,
					price:item.price,
					isHave:item.isHave,
				}
			} 
			key={item.id}
			onClick={() => onItemClick?.(item)}
		/>)}
	</div>
</Section>
}

const MyPageCharacterTemplate={
	MyCharacter,
	CharacterList,
	ItemList,
}
export default MyPageCharacterTemplate;
