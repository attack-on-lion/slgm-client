import { ItemApi } from "@/interfaces/Item";
import http from "./config";

const api=http.api()

async function getItem(){
	const response=await api.get<ItemApi>('/store/items')
	return response.data
}
async function getItemByUserId(userId:number){
	const response=await api.get<{ownedItems:{itemId:number}[]}>(`/users/${userId}/items`)
	return response.data
}
async function buyItem(userId:number, itemId:number, price:number){
	const response=await api.post(`/users/${userId}/items/${itemId}/purchase`, {price})
	return response.data
}
const itemApi={		
	getItem,
	getItemByUserId,
	buyItem,
}		

export default itemApi