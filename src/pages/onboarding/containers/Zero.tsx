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
  const Native_app_key = import.meta.env.VITE_KAKAO_NATIVE_APP_KEY; // 네이티브 앱 키
  const redirect_uri = import.meta.env.VITE_KAKAO_REDIRECT_URI;

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(Rest_api_key);
    }
  }, [Rest_api_key]);

  const handleLogin = () => {
    const intentUrl = `intent://authorize?client_id=${Native_app_key}&response_type=code&redirect_uri=${encodeURIComponent(
      redirect_uri
    )}#Intent;scheme=kakao;package=com.kakao.talk;end`;
    const webLoginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${encodeURIComponent(
      redirect_uri
    )}&response_type=code`;

    // Try to redirect using the intent URL
    try {
      window.location.href = intentUrl;
    } catch (error) {
      // Fallback to web login if the intent URL fails
      window.location.href = webLoginUrl;
    }
    window.Kakao.Auth.authorize({
      redirectUri: redirect_uri,
      throughTalk: true, // 간편 로그인을 위해 추가
    });
  };

  return (
    <div className="flex flex-col">
      <OnboardingTitle />
      <div onClick={handleLogin} className="grid place-items-center mt-8">
        <KakaoBtn />
      </div>
    </div>
  );
};

export default Zero;
