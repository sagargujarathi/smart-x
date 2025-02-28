import { HTTPClient } from "@/utils/http-client";
import {
  IServiceUserResponse,
  ISignInRequestType,
  ISignInResponseType,
  ISignUpRequestType,
  ISignUpResponseType,
} from "./types";

const HTTPService = {
  signIn: (data: ISignInRequestType) =>
    HTTPClient.post<{ data: ISignInResponseType }>("/signin", {
      data,
      withCredentials: true,
    }),

  signup: (data: ISignUpRequestType) =>
    HTTPClient.post<{ data: ISignUpResponseType }>("/service/signup", {
      data,
    }),

  getUserDetails: () =>
    HTTPClient.get<{ data: IServiceUserResponse }>("/service-user/details"),
};

export default HTTPService;
