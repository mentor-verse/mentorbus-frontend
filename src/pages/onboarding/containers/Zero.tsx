import { OnboardingTitle } from "@/pages/onboarding/containers/OnboardingTitle";
import React, { useEffect } from "react";
import { KakaoBtn } from "@/components/Icons/KakaoBtn";
import { GoogleBtn } from "@/components/Icons/GoogleBtn";
import { AppleBtn } from "@/components/Icons/AppleBtn";
import { useNavigate } from "react-router-dom";
import { signInUser, signUpUser } from "@/apis/googleAuth"; // 로그인/회원가입 API
import { getGoogleAccessToken } from "@/hooks/login/useGoogleOAuth"; // OAuth 토큰 교환 함수

// You can import your Apple login API function here
//import { appleLoginRedirect } from "@/apis/appleAuth"; // Define the function to handle Apple login

// 파일 상단 혹은 타입 선언 파일(d.ts)에서 아래와 같이 선언합니다.
declare global {
  interface Window {
    AppleID: {
      auth: {
        init: (config: {
          clientId: string;
          scope: string;
          redirectURI: string;
          state: string;
          nonce: string;
          usePopup: boolean;
        }) => void;
        signIn: () => Promise<any>;
      };
    };
  }
}

interface ZeroProps {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

declare global {
  interface Window {
    Kakao: any;
  }
}

const Zero: React.FC<ZeroProps> = () => {
  const navigate = useNavigate();

  // 환경변수
  const kakaoRestApiKey = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const kakaoRedirectUri = import.meta.env.VITE_KAKAO_REDIRECT_URI;
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const googleRedirectUri = import.meta.env.VITE_GOOGLE_REDIRECT_URI;
  const googleScope = "profile email";

  // Kakao 초기화
  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(kakaoRestApiKey);
    }
  }, [kakaoRestApiKey]);

  // URL에 OAuth code가 있으면 로그인/회원가입 진행
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      (async () => {
        try {
          // 1. Google에서 id_token(액세스 토큰) 교환
          const googleAccessToken = await getGoogleAccessToken(code);
          console.log("Google Access Token:", googleAccessToken);

          let response;
          try {
            // 2. signInUser API 호출로 로그인 시도
            response = await signInUser("google", {
              redirectUri: googleRedirectUri,
              token: googleAccessToken,
            });
            console.log("Google 로그인 성공:", response);
            navigate("/main");
          } catch (loginError: any) {
            // 만약 "User not found" 에러라면 회원가입 진행
            if (
              loginError.response &&
              loginError.response.data.message === "User not found"
            ) {
              console.log("사용자 정보가 없으므로 회원가입을 진행합니다.");
              response = await signUpUser("google", {
                redirectUri: googleRedirectUri,
                token: googleAccessToken,
                nickname: "test",
              });
              console.log("Google 회원가입 성공:", response);
              navigate("/onboarding");
            } else {
              throw loginError;
            }
          }
        } catch (error) {
          console.error("Google 로그인/회원가입 오류:", error);
          navigate("/");
        }
      })();
    }
  }, [navigate, googleRedirectUri]);

  // 소셜 로그인 버튼 핸들러
  const handleKakaoLogin = () => {
    const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoRestApiKey}&redirect_uri=${encodeURIComponent(
      kakaoRedirectUri
    )}&response_type=code`;
    window.location.href = kakaoLoginUrl;
  };

  const handleGoogleLogin = () => {
    const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${encodeURIComponent(
      googleRedirectUri
    )}&response_type=code&scope=${encodeURIComponent(googleScope)}`;
    window.location.href = googleLoginUrl;
  };

  /*
  const handleAppleLogin = () => {
    appleLoginRedirect();
  };
  */

  const loginWithApple = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    console.log("sign in with apple");

    (window as any).AppleID.auth.init({
      clientId: import.meta.env.VITE_APPLE_CLIENT_ID,
      scope: "name email",
      redirectURI: import.meta.env.VITE_APPLE_REDIRECT_URI,
      state: "state_parameter",
      nonce: "random_nonce",
      usePopup: true,
    });

    try {
      const res = await (window as any).AppleID.auth.signIn();
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col">
      <OnboardingTitle />
      <div className="grid place-items-center mt-8">
        <div className="flex">
          <div onClick={handleKakaoLogin}>
            <KakaoBtn />
          </div>
          <div className="ml-5"></div>
          <div onClick={handleGoogleLogin}>
            <GoogleBtn />
          </div>
          <div className="ml-5"></div>
          <div onClick={loginWithApple}>
            <AppleBtn />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Zero;
