import { KakaoUserType } from "../types/login/UserType";
import { client } from "./clients";

export const kakaoAuthCodeApi = (authCode: string) => {
  return client.get<KakaoUserType>(`/auth/callback?code=${authCode}`);
};
