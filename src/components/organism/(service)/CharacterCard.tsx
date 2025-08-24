	import { Character } from "@/interfaces/Character";
import { cn } from "fast-jsx/util";
import Image from "next/image";

function CharacterCard({character, isFocus}:{character:Character, isFocus:boolean}){
	const container={
		position:'relative',
		display:'flex flex-col',
		gap:isFocus?'gap-[35px]':'gap-[20px]',
		padding:'pt-[29px]',
		size: isFocus?'w-[202px] h-[237px]':'w-[157px] h-[184px]',
		border: isFocus?'border-main':'border-transparent',
		borderDefault:'border-2 rounded-[20px]',
		flex: 'flex-shrink-0',
		font: isFocus?'text-[20px]':'text-[16px]',
		overflow:'overflow-hidden',
		transition: 'transition-all duration-200 ease-in-out',
	}
	const imageSize = isFocus ? 120 : 72;
	return <div className={cn(container)}>
			<div className="flex justify-center transition-transform duration-200 ease-in-out">
				<Image 
					src={character.imageUrl} 
					alt={character.name} 
					width={imageSize} 
					height={imageSize} 
					className="object-contain transition-all duration-200 ease-in-out" 
				/>
			</div>
			<div className="font-bold text-center transition-all duration-200 ease-in-out">{character.name}</div>
			<div className={`absolute top-0 left-0 w-full h-full bg-[#BEBEBE8F]/56 transition-opacity duration-200 ease-in-out ${isFocus ? 'opacity-0' : 'opacity-100'}`}/>
		</div>
}
function CharacterCardAbbreviation({character}:{character:Character}){
	const container={
		display:'flex flex-col items-center gap-y-[12px]',
		size:'w-[157px] h-[184px]',
	}
	const card={
		display:'flex flex-col justify-center gap-[13px]',
		size:'w-[108px] h-[121px]',
		border:'rounded-[20px]',
	}
	const button={
		display:'flex justify-center items-center',
		padding:'px-[12px] py-[6px]',
		border : character.isHave?'border-sub-title':'border-main',
		font:character.isHave?'text-sub-title':'text-white',
		background:!character.isHave&&'bg-main',
		boundary:'rounded-[20px] border-1 ',
	}
	return <div className={cn(container)}>
		<div className={cn(card)} style={{boxShadow: '0px 2px 10px 0px rgba(0, 0, 0, 0.10)'}}>
			<div className="flex justify-center w-full">
			<Image src={character.imageUrl} alt={character.name} width={60} height={54} className="object-contain"/>
			</div>
			<div className="text-center">{character.price.toLocaleString()} P</div>
		</div>
		<div className={cn(button)}>
			{character.isHave?"보유중":"구매하기"}
		</div>
	</div>
}

CharacterCard.Abbreviation=CharacterCardAbbreviation;
export default CharacterCard;