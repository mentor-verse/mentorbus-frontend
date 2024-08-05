// src/hooks/useAuth.ts
import { useQueryClient } from "react-query";
import {
  setKakaoToken,
  clearKakaoToken,
  setStoredUserData,
  clearStoredUserData,
} from "../utils/auth";
import getToken from "../services/kakaoAuthService";

const useAuth = () => {
  const queryClient = useQueryClient();

  const signIn = async (code: string) => {
    const userData = await getToken(code);
    setKakaoToken(userData.data.accessToken);
    setStoredUserData(userData.data);
    queryClient.setQueryData("user", userData.data);
  };

  const signOut = () => {
    clearKakaoToken();
    clearStoredUserData();
    queryClient.removeQueries("user");
  };

  return { signIn, signOut };
};

export default useAuth;
