'use client'
import ServiceHeader from "@/components/molecule/(service)/Header";
import MyPageCharacterTemplate, { ItemRender } from "@/components/template/(service)/MyPage.character";
import PurchaseModal from "@/components/molecule/(service)/PurchaseModal";
import { Item } from "@/interfaces/Item";
import { CharacterRender } from "@/interfaces/Character";
import itemApi from "@/services/api/item";
import characterApi from "@/services/api/character";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { cn } from "fast-jsx/util";
import { useEffect, useState } from "react";
import Loading from "@/components/template/Loading";
import useSign from "@/hooks/useSign";

const ownedCharacters=[
	'다람쥐',
	'고양이',
	'쥐돌이',
	'갱쥐'
]

export default function Client(){
	const { userId, userData } = useSign();
	const [items, setItems]=useState<ItemRender[]>([])
	const [selectedItem, setSelectedItem] = useState<ItemRender | null>(null)
	const [selectedCharacter, setSelectedCharacter] = useState<any>(null)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [modalType, setModalType] = useState<'character' | 'item'>('item')
	
	const queryClient = useQueryClient()
	
	const {data:itemsData, isSuccess:itemsSuccess}=useQuery({
		queryKey:['items'],	
		queryFn:()=>itemApi.getItem(),
	});
	const {data:itemsDataByUserId, isSuccess:itemsSuccessByUserId}=useQuery({
		queryKey:['itemsByUserId', userId],
		queryFn:()=>itemApi.getItemByUserId(userId || 1),
		enabled: !!userId,
	});
	
	const {data:charactersData, isSuccess:charactersSuccess}=useQuery({
		queryKey:['characters'],
		queryFn:()=>characterApi.getCharacter(),
	});
	
	const {data:charactersDataByUserId, isSuccess:charactersSuccessByUserId}=useQuery({
		queryKey:['charactersByUserId', userId],
		queryFn:()=>characterApi.getCharacterByUserId(userId || 1),
		enabled: !!userId,
	});
	
	const purchaseItemMutation = useMutation({
		mutationFn: (item: ItemRender) => 
			itemApi.buyItem(userId || 1, item.id, item.price),
		onSuccess: () => {
			// 구매 성공 시 캐시 무효화
			queryClient.invalidateQueries({ queryKey: ['itemsByUserId', userId] })
			setIsModalOpen(false)
			setSelectedItem(null)
		},
		onError: (error) => {
			console.error('아이템 구매 실패:', error)
			alert('아이템 구매에 실패했습니다.')
		}
	})
	
	const purchaseCharacterMutation = useMutation({
		mutationFn: (character: any) => 
			characterApi.buyCharacter(userId || 1, character.id, character.price),
		onSuccess: () => {
			// 구매 성공 시 캐시 무효화
			queryClient.invalidateQueries({ queryKey: ['charactersByUserId', userId] })
			setIsModalOpen(false)
			setSelectedCharacter(null)
		},
		onError: (error) => {
			console.error('캐릭터 구매 실패:', error)
			alert('캐릭터 구매에 실패했습니다.')
		}
	})
	// use itemsDataByUserId
	useEffect(()=>{
		if(itemsSuccessByUserId && itemsDataByUserId?.ownedItems){
			// ownedItems는 itemId 배열이므로 전체 아이템에서 매칭
			const ownedItemIds = itemsDataByUserId.ownedItems.map(owned => owned.itemId);
			if(itemsData?.items) {
				setItems(itemsData.items.map((item: any)=>({
					...item,
					isHave: ownedItemIds.includes(item.id),
				})))
			}
		}
	},[itemsSuccessByUserId, itemsDataByUserId, itemsData])
	
	useEffect(()=>{
		if(itemsSuccess && itemsData?.items && !itemsDataByUserId?.ownedItems){
			setItems(itemsData.items.map((item: any)=>({
				...item,
				isHave:false,	
			})))
		}
	},[itemsSuccess, itemsData, itemsDataByUserId])
	
	// 캐릭터 데이터 처리
	const [characters, setCharacters] = useState<CharacterRender[]>([])
	
	useEffect(()=>{
		if(charactersSuccessByUserId && charactersDataByUserId?.items && charactersData?.items){
			// 보유한 캐릭터 ID 목록
			const ownedCharacterIds = charactersDataByUserId.items.map(char => char.id);
			// 전체 캐릭터에 보유 상태 추가
			setCharacters(charactersData.items.map((character: any)=>({
				...character,
				isHave: ownedCharacterIds.includes(character.id),
			})))
		}
	},[charactersSuccessByUserId, charactersDataByUserId, charactersData])
	
	useEffect(()=>{
		if(charactersSuccess && charactersData?.items && !charactersDataByUserId?.items){
			setCharacters(charactersData.items.map((character: any)=>({
				...character,
				isHave: false,
			})))
		}
	},[charactersSuccess, charactersData, charactersDataByUserId])
	
	const handleItemClick = (item: ItemRender) => {
		if (item.isHave) {
			alert('이미 보유한 아이템입니다.')
			return
		}
		setSelectedItem(item)
		setModalType('item')
		setIsModalOpen(true)
	}
	
	const handleCharacterClick = (character: any) => {
		if (character.isHave) {
			alert('이미 보유한 캐릭터입니다.')
			return
		}
		setSelectedCharacter(character)
		setModalType('character')
		setIsModalOpen(true)
	}
	
	const handlePurchase = () => {
		if (modalType === 'item' && selectedItem) {
			purchaseItemMutation.mutate(selectedItem)
		} else if (modalType === 'character' && selectedCharacter) {
			purchaseCharacterMutation.mutate(selectedCharacter)
		}
	}
	
	const body={
		display:'flex flex-col gap-y-[8px]',
		background:'bg-bg-color-2',
	}
	// 로딩 상태 확인
	const isLoading = !itemsSuccess || !charactersSuccess || !itemsSuccessByUserId || !charactersSuccessByUserId
	
	if (isLoading) {
		return (
			<Loading/>
		)
	}
	return <div  >
		<ServiceHeader title="캐릭터 상점" option={{isBack:true}}/>
		<div className={cn(body)}>
			<MyPageCharacterTemplate.MyCharacter
				characters={ownedCharacters.map((character,index)=>({
					id:index,
					name:character,
					imageUrl:`/images/characters/${character}.png`,
					isHave:true,
					price:10000,
				})) 
				}
			/>
			<MyPageCharacterTemplate.CharacterList 
				point={userData?.point || 0} 
				characters={characters.map((character)=>({
					id:character.id,
					name:character.name,
					imageUrl:characterMockImages[character.id % characterMockImages.length],
					isHave:character.isHave,
					price:character.price,
				}))}
				onCharacterClick={handleCharacterClick}
			/>
			<MyPageCharacterTemplate.ItemList 
				items={
					items.map((item)=>({
						id:item.id,
						name:item.name,
						imageUrl:itemMockImages[item.id % itemMockImages.length],
						price:item.price,
						code:item.code,
						isHave:item.isHave,
					}))
				}
				onItemClick={handleItemClick}
				userPoint={userData?.point || 0}
			/>
		</div>
		
		<PurchaseModal
			isOpen={isModalOpen}
			onClose={() => {
				setIsModalOpen(false)
				setSelectedItem(null)
				setSelectedCharacter(null)
			}}
			onConfirm={handlePurchase}
			item={modalType === 'item' && selectedItem ? {
				name: selectedItem.name,
				price: selectedItem.price,
				imageUrl: itemMockImages[selectedItem.id % itemMockImages.length],
				type: 'item'
			} : modalType === 'character' && selectedCharacter ? {
				name: selectedCharacter.name,
				price: selectedCharacter.price,
				imageUrl: selectedCharacter.imageUrl,
				type: 'character'
			} : {
				name: '',
				price: 0,
				imageUrl: '',
				type: 'item'
			}}
			userPoint={userData?.point || 0}
			isLoading={modalType === 'item' ? purchaseItemMutation.isPending : purchaseCharacterMutation.isPending}
		/>
	</div>
}

const characterMockImages=[
	'/images/characters/다람쥐 얼굴.png',
	'/images/characters/고양이 얼굴.png',
	'/images/characters/쥐돌이 웃는얼굴.png',
	'/images/characters/갱쥐 웃는얼굴.png',
]

const itemMockImages=[
	'/images/items/아이템.png',
	'/images/items/아이템2.png',
	'/images/items/아이템3.png',
	'/images/items/아이템4.png',
]