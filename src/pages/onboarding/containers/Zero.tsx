import { Button } from "@/components/ui/button";
import { OnboardingTitle } from "@/pages/onboarding/containers/OnboardingTitle";
import { OnbordingBus } from "@/components/Icons/OnboardingBus";
import React from "react";

interface ZeroProps {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

const Zero: React.FC<ZeroProps> = () => {
  const Rest_api_key = import.meta.env.VITE_KAKAO_REST_API_KEY; // REST API KEY
  const redirect_uri = import.meta.env.VITE_KAKAO_REDIRECT_URI;
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  const code = new URL(window.location.href).searchParams.get("code");
  console.log(code);

  return (
    <>
      <OnboardingTitle />

      <div
        onClick={handleLogin}
        className="absolute top-1/2 left-1/2 transform -translate-x-[50%] -translate-y-3/4 grid place-items-center"
      >
        <Button variant={"kakao"} size={"ka"}>
          카카오 로그인
        </Button>
      </div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-[70%] -translate-y-0 grid place-items-center z-10">
        <OnbordingBus />
      </div>
    </>
  );
};

export default Zero;
