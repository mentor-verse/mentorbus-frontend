// src/containers/Zero.js
import { OnboardingTitle } from "@/pages/onboarding/containers/OnboardingTitle";
import React, { useEffect } from "react";
import { KakaoBtn } from "@/components/Icons/KakaoBtn";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(Rest_api_key);
    }
  }, [Rest_api_key]);

  const handleLogin = () => {
    const position = localStorage.getItem("position");
    const userName = localStorage.getItem("userName");
    const userBelong = localStorage.getItem("userBelong");
    const major = localStorage.getItem("major");

    if (position && userName && userBelong && major) {
      navigate("/main");
    } else {
      window.Kakao.Auth.authorize({
        redirectUri: redirect_uri,
      });
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
