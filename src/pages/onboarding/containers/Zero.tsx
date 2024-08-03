import { OnboardingTitle } from "@/pages/onboarding/containers/OnboardingTitle";
import { OnbordingBus } from "@/components/Icons/OnboardingBus";
import React from "react";
import { Road } from "@/components/Icons/Road";
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
      window.location.href = kakaoURL;
    }
  };

  const code = new URL(window.location.href).searchParams.get("code");
  console.log(code);

  return (
    <div className="flex flex-col min-h-screen relative">
      <OnboardingTitle />

      <div onClick={handleLogin} className="grid place-items-center mt-[5%]">
        <KakaoBtn />
      </div>

      <div className="flex-grow relative">
        <div className="absolute inset-x-0 bottom-0 z-10 grid place-items-center">
          <Road />
        </div>
        <div className="onboarding-bus-container absolute z-20 -ml-[100px]">
          <OnbordingBus />
        </div>
      </div>
    </div>
  );
};

export default Zero;
