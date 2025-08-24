export interface CharacterRender{
	id:number,
	name:string,
	imageUrl:string,
	price:number,
	isHave:boolean,
}
export interface Character{
	id: number,
	code: string,
	name: string,
	price: number,
	imageUrl: string,
}

export interface CharacterApi{
	items:Character[],
}