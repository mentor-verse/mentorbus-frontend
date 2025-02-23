import React from "react";
import { KakaoBtn } from "@/components/Icons/KakaoBtn";
import { GoogleBtn } from "@/components/Icons/GoogleBtn";
import { AppleBtn } from "@/components/Icons/AppleBtn";

interface SocialLoginButtonsProps {
  onKakaoLogin: () => void;
  onGoogleLogin: () => void;
  onAppleLogin: (e: React.MouseEvent<HTMLElement>) => void;
}

export const SocialLoginButtons: React.FC<SocialLoginButtonsProps> = ({
  onKakaoLogin,
  onGoogleLogin,
  onAppleLogin,
}) => {
  return (
    <div className="grid place-items-center mt-8">
      <div className="flex">
        <div onClick={onKakaoLogin}>
          <KakaoBtn />
        </div>
        <div className="ml-5"></div>
        <div onClick={onGoogleLogin}>
          <GoogleBtn />
        </div>
        <div className="ml-5"></div>
        <div onClick={onAppleLogin}>
          <AppleBtn />
        </div>
      </div>
    </div>
  );
};
