
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

const characterApi={
	getCharacter,
	getCharacterByUserId,
}

export default characterApi