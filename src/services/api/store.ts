import { CouponApi, StoreApi } from "@/interfaces/Store";
import http from "./config";

const api=http.api()

async function getGifticon(userId:number){
	const response=await api.get<StoreApi>(`/gifticons`)
	return response.data
}

async function getCoupon(userId:number){
	const response=await api.get<CouponApi>(`/users/${userId}/gifticons`)
	return response.data
}

const storeApi={
	getGifticon,
	getCoupon,
}

export default storeApi