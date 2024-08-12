// kakaoRedirect.tsx

declare global {
  interface Window {
    Kakao: any;
    Android: any;
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
        // Get the transformed user data after Kakao login
        const transformedUserData = await getToken(code);
        console.log("Transformed User Data:", transformedUserData);

        // Register the user by sending a POST request to the /users/register endpoint
        const registrationResponse = await fetch(
          "https://backend-production-860e.up.railway.app/users/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(transformedUserData),
          }
        );

        if (!registrationResponse.ok) {
          throw new Error("Failed to register the user");
        }

        // Parse the JSON response
        const registeredUserData = await registrationResponse.json();
        console.log("Registered User Data:", registeredUserData);

        // Notify the Android app about the login success
        if (window.Android) {
          window.Android.onLoginSuccess();
        }

        // Set the logged-in state and navigate to the onboarding page
        setIsLoggedIn(true);
        navigate("/mentorbus-frontend/onboarding");
      } catch (error: unknown) {
        console.error("Error during registration or login:", error);

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
