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
    <div className="flex flex-col min-h-screen">
      <OnboardingTitle />

      <div onClick={handleLogin} className="grid place-items-center mt-8">
        <KakaoBtn />
      </div>

      <div className="flex-grow flex flex-col justify-end">
        <div className="relative grid place-items-center">
          <Road className="w-full" />
          <div className="absolute bottom-0">
            <OnbordingBus />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Zero;
