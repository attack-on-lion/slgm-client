
import { Character, CharacterApi } from '@/interfaces/Character';
import http from './config';

const  api= http.api()

 async function getCharacter(){
	const response=await api.get<CharacterApi>('/store/characters')
	return response.data
}

async function getCharacterByUserId(userId:number){
	const response=await api.get<CharacterApi>(`/users/${userId}/charactors`)
	return response.data
}

async function buyCharacter(userId:number, characterId:number, price:number){
	const response=await api.post(`/user/${userId}/charactors/${characterId}/purchase`, {price})
	return response.data
}

const characterApi={
	getCharacter,
	getCharacterByUserId,
	buyCharacter,
}

export default characterApi