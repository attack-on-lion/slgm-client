export interface UserCreateRequest {
  name: string;
  age: number;
  profileImgUrl?: string;
  location: string;
  gender: string;
  email: string;
  phoneNumber: string;
  categoryName: string;
  point: number;
  baseAmount: number;
}

export interface UserCreateResponse {
  msg: string;
}

export interface UserProfile {
  user_id: number;
  name: string;
  age: number;
  profileImgUrl?: string;
  location: string;
  gender: string;
  email: string;
  phoneNumber: string;
  categoryName: string;
  point: number;
  baseAmount: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserError {
  errorCode: string | number;
  errorMessage: string;
}
