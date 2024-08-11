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
    const userAgent = navigator.userAgent || navigator.vendor;
    return /android|iPhone|iPad|iPod/i.test(userAgent);
  };

  const handleLogin = () => {
    if (isMobile()) {
      window.Kakao.Auth.authorize({
        redirectUri: redirect_uri,
        throughTalk: true,
        fail: (err: any) => {
          console.error("Kakao login failed", err);
          alert("Kakao login failed, please try again.");
        },
        success: (authObj: any) => {
          console.log("Kakao login successful", authObj);
        },
      });
    } else {
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
