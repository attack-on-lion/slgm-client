export interface Item{
	id:number,
	code:string,
	name:string,
	price:number,
	imageUrl:string,
}
export interface ItemApi{
  summary: {
    count: number
  },
  pageInfo: {
	  page: number,
		size:number, 
		hasNext: boolean
	},
  items: Item[]
}