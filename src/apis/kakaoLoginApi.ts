import { UserType } from "../types/login/UserType";
import { client } from "./clients";

export const kakaoAuthCodeApi = (authCode: string) => {
  return client.get<UserType>(`/auth/callback?code=${authCode}`);
};
