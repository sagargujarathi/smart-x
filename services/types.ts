import { IUserDetailsType } from "@/types/auth";

export interface APIResponse {
  success: boolean;
  message: string;
}

export interface ISignInRequestType {
  service_id: string;
  email: string;
  password: string;
}

export interface ISignInResponseType extends APIResponse {
  expires_at: string;
}

export interface ISignUpResponseType extends APIResponse {
  service_user_id: string;
}

export interface ISignUpRequestType {
  service_id: string;
  email: string;
  password: string;
}

export type IServiceUserResponse = APIResponse & IUserDetailsType;
