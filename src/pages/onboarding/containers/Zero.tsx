// src/containers/Zero.js
import { OnboardingTitle } from "@/pages/onboarding/containers/OnboardingTitle";
import React, { useEffect } from "react";
import { KakaoBtn } from "@/components/Icons/KakaoBtn";
import { useNavigate } from "react-router-dom";

interface ZeroProps {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

const Zero: React.FC<ZeroProps> = () => {
  const Rest_api_key = import.meta.env.VITE_KAKAO_REST_API_KEY; // REST API KEY
  const redirect_uri = import.meta.env.VITE_KAKAO_REDIRECT_URI;
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

  const navigate = useNavigate();

  const handleLogin = () => {
    const position = localStorage.getItem("position");
    const userName = localStorage.getItem("userName");
    const userBelong = localStorage.getItem("userBelong");
    const major = localStorage.getItem("major");

    if (position && userName && userBelong && major) {
      navigate("/main");
    } else {
      openPopup(kakaoURL);
    }
  };

  const openPopup = (url) => {
    const width = 500;
    const height = 600;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
    const popup = window.open(
      url,
      "_blank",
      `width=${width},height=${height},left=${left},top=${top}`
    );

    if (!popup) {
      console.error("Failed to open popup window.");
      return;
    }

    const interval = setInterval(() => {
      try {
        if (popup.closed) {
          clearInterval(interval);
          console.log("Popup closed by user.");
        }

        if (popup.location.href.startsWith(redirect_uri)) {
          const params = new URL(popup.location.href).searchParams;
          const code = params.get("code");
          console.log("Authorization code:", code);
          popup.close();
          // Here you can handle the authorization code, e.g., send it to your server
        }
      } catch (error) {
        // Ignore DOMException: Blocked a frame with origin from accessing a cross-origin frame.
      }
    }, 500);
  };

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    if (code) {
      console.log(code);
      // Handle the authorization code here, e.g., send it to your server to exchange for an access token
    }
  }, []);

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
