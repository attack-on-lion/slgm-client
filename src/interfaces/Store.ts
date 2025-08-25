export const storeTypes=['전체','음식점','카페','편의점','마트','기타'] as const;
export type StoreType=typeof storeTypes[number];

export interface Item{
	storeName:string,
	name:string,
	point:number,
	imageUrl:string,
	storeType:StoreType,
}

interface Gifticon{
	id:number,
	name:string,
	price:number,
	imageUrl:string,
	createdAt:string,
	isRecommend:boolean,
}
export interface StoreApi{
	gifticonlist: Gifticon[],
	nextCursor: {
		lastStoreName: string,
		lastGifticonName: string,
		lastId: number,
		lastCreatedAt: string,
	},
	hasNext: boolean,
	size: number,
}

interface StoreBrand{
	storeId:number,
	storeName:string,
	logoUrl:string,
	categoryId:number,
	categoryName:string,
}
export interface StoreBrandApi{
	stores: StoreBrand[],
	nextCursor: {
		lastStoreName: string,
		lastId: number,
	},
	hasNext: boolean,
	size: number,
}

export interface CouponApi{
	size: number,
	ownedGifticonList: 
		{
			id: number,
			userId: number,
			gifticonId: number,
			gifticonName: string,
			gifticonPrice: number,
			imageUrl: string,
			usedAt: string | null,
			}[]
}

export interface Coupon{
	id:number,
	category:string,
	storeName:string,
	name:string,
	imageUrl:string,
	expiredAt:string,
}