export const storeTypes=['전체','음식점','카페','편의점','마트','기타'] as const;
export type StoreType=typeof storeTypes[number];