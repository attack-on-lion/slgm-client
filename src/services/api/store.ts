import { CouponApi, StoreApi, StoreBrandApi } from "@/interfaces/Store";
import http from "./config";

const api=http.api()

async function getStore(){
	const response=await api.get<StoreApi>(`/stores`)
	return response.data
}

async function getGifticonsByStoreId(storeId:number){
	const response=await api.get<StoreApi>(`/stores/${storeId}/gifticons`)
	return response.data
}

async function getStoreBrand(){
	const response=await api.get<StoreBrandApi>(`/stores/brand`)
	return response.data
}

async function getGifticon(){
	const response=await api.get<StoreApi>(`/gifticons`)
	return response.data
}

async function getCoupon(userId:number){
	const response=await api.get<CouponApi>(`/users/${userId}/gifticons`)
	return response.data
}

async function purchaseGifticon(userId:number, gifticonId:number){
	const response=await api.post<StoreApi>(`/users/${userId}/gifticons/${gifticonId}/purchase`)
	return response.data
}

const storeApi={
	getStore,
	getStoreBrand,
	getGifticonsByStoreId,
	getGifticon,
	getCoupon,
	purchaseGifticon,
}

export default storeApi