// kakaoRedirect.tsx

declare global {
  interface Window {
    Kakao: any;
    Android: any; // Add this line to declare the Android interface
  }
}

import { useNavigate, useSearchParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { useEffect, useCallback } from "react";
import { isLoggedInAtom } from "@/atoms/isLoggedInAtom";
import getToken from "../containers/apis/getToken";

export function KakaoRedirect() {
  const navigate = useNavigate();
  const setIsLoggedIn = useSetRecoilState(isLoggedInAtom);
  const [searchParams] = useSearchParams();

  const handleLogin = useCallback(
    async (code: string) => {
      try {
        const transformedUserData = await getToken(code);
        console.log("Transformed User Data:", transformedUserData);

        setIsLoggedIn(true);
        navigate("/mentorbus-frontend/onboarding");

        // Notify the Android app about the login success
        if (window.Android) {
          window.Android.onLoginSuccess();
        }
      } catch (error: unknown) {
        console.error("Error fetching user data:", error);

        // Notify the Android app about the login error
        if (window.Android) {
          const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
          window.Android.onLoginError(errorMessage);
        }
      }
    },
    [navigate, setIsLoggedIn]
  );

  useEffect(() => {
    const code = searchParams.get("code");

    if (code) {
      handleLogin(code);
    }
  }, [searchParams, handleLogin]);

  return (
    <div>
      <h1>로그인 중입니다.</h1>
    </div>
  );
}

export default KakaoRedirect;
