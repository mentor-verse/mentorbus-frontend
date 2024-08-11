// src/containers/Zero.js
import { OnboardingTitle } from "@/pages/onboarding/containers/OnboardingTitle";
import React, { useEffect } from "react";
import { KakaoBtn } from "@/components/Icons/KakaoBtn";

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
  const Rest_api_key = import.meta.env.VITE_KAKAO_REST_API_KEY; // REST API KEY
  const redirect_uri = import.meta.env.VITE_KAKAO_REDIRECT_URI;

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(Rest_api_key);
    }
  }, [Rest_api_key]);

  const isMobile = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    return /android|iPhone|iPad|iPod/i.test(userAgent);
  };

  const handleLogin = () => {
    if (isMobile()) {
      // 모바일 기기인 경우 간편 로그인
      window.Kakao.Auth.login({
        success: function (authObj: any) {
          console.log("Login success:", authObj);
          window.location.href = redirect_uri; // 로그인 성공 후 리다이렉트
        },
        fail: function (err: any) {
          console.error("Login failed:", err);
        },
        throughTalk: true, // 간편 로그인을 위해 추가
      });
    } else {
      // 모바일이 아닌 경우 웹 로그인 처리
      const webLoginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${encodeURIComponent(
        redirect_uri
      )}&response_type=code`;

      window.location.href = webLoginUrl;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <OnboardingTitle />
      <div onClick={handleLogin} className="grid place-items-center mt-8">
        <KakaoBtn />
      </div>
    </div>
  );
};

export default Zero;
