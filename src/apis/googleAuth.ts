import {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
} from "@/types/login/googleAuth";
import { client } from "./clients";

export const signInUser = async (
  provider: "google",
  data: SignInRequest
): Promise<SignInResponse> => {
  const response = await client.post<SignInResponse>(`/api/auth/signin`, {
    provider,
    ...data,
  });
  return response.data;
};

export const signUpUser = async (
  provider: "google",
  data: SignUpRequest
): Promise<SignInResponse> => {
  const response = await client.post<SignInResponse>(`/api/auth/signup`, {
    provider,
    ...data,
  });
  return response.data;
};
