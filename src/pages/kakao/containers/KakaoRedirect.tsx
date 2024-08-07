// kakaoRedirect.tsx

declare global {
  interface Window {
    Kakao: any;
  }
}

import { useNavigate, useSearchParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { useEffect, useCallback } from "react";
import { isLoggedInAtom } from "@/atoms/isLoggedInAtom";
import getToken from "../containers/apis/getToken"; // Import the getToken function

export function KakaoRedirect() {
  const navigate = useNavigate();
  const setIsLoggedIn = useSetRecoilState(isLoggedInAtom);
  const [searchParams] = useSearchParams();

  const handleLogin = useCallback(
    async (code: string) => {
      try {
        const transformedUserData = await getToken(code); // Use the getToken function
        console.log("Transformed User Data:", transformedUserData);

        // Set the login state and navigate to the onboarding page
        setIsLoggedIn(true);
        navigate("/mentorbus-frontend/onboarding");
      } catch (error) {
        console.error("Error fetching user data:", error);
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
