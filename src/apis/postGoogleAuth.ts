import {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
} from "@/types/login/GoogleAuth";
import { clientAuth } from "@/apis/clients";

export const signInUser = async (_provider: "google", data: SignInRequest) => {
  const response = await clientAuth<SignInResponse>({
    method: "POST",
    url: "/api/auth/signin",
    data,
  });

  return response.data;
};

export const signUpUser = async (_provider: "google", data: SignUpRequest) => {
  const response = await clientAuth<SignInResponse>({
    method: "POST",
    url: "/api/auth/signup",
    data,
  });

  return response.data;
};
