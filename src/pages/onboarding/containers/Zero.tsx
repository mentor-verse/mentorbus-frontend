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

  const handleLogin = () => {
    const webLoginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${encodeURIComponent(
      redirect_uri
    )}&response_type=code`;

    window.location.href = webLoginUrl;
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
