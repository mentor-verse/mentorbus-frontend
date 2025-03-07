import React, { useEffect } from "react";
import { OnboardingTitle } from "../components/OnboardingTitle";
import { useNavigate } from "react-router-dom";
import { usePostAppleData } from "@/hooks/usePostAppleData";
import { useGoogleOAuthHandler } from "../hooks/useGoogleOAuthHandler";
import { SocialLoginButtons } from "../components/SocialLoginBtn";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/firebase";
import axios from "axios";

declare global {
  interface Window {
    AppleID: {
      auth: {
        init: (config: {
          clientId: string;
          scope: string;
          redirectURI: string;
          state: string;
          nonce: string;
          usePopup: boolean;
        }) => void;
        signIn: () => Promise<any>;
      };
    };
    Kakao: any;
  }
}

const Zero: React.FC = () => {
  const navigate = useNavigate();

  const kakaoRestApiKey = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const kakaoRedirectUri = import.meta.env.VITE_KAKAO_REDIRECT_URI;
  // const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const googleRedirectUri = import.meta.env.VITE_GOOGLE_REDIRECT_URI;
  // const googleScope = "profile email";

  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(kakaoRestApiKey);
    }
  }, [kakaoRestApiKey]);

  useGoogleOAuthHandler(googleRedirectUri);

  const handleKakaoLogin = () => {
    const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoRestApiKey}&redirect_uri=${encodeURIComponent(
      kakaoRedirectUri
    )}&response_type=code`;
    window.location.href = kakaoLoginUrl;
  };

  // const handleGoogleLogin = () => {
  //   const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${encodeURIComponent(
  //     googleRedirectUri
  //   )}&response_type=code&scope=${encodeURIComponent(googleScope)}`;
  //   window.location.href = googleLoginUrl;
  // };

  const fetchLogin = async (
    socialType: string,
    uid: string,
    email: string | null
  ) => {
    return await axios
      .post(`http://localhost:3000/member/login/${socialType}`, {
        uid: uid,
        email: email,
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.error(err);
        return null;
      });
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    // console.log(await auth.currentUser?.getIdToken());
    await signInWithPopup(auth, provider)
      .then(async (data) => {
        const uid = data.user.uid;
        const socialType = "GOOGLE";
        const email = data.user.email ?? "";

        fetchLogin(socialType, uid, email)
          .then((res) => {
            console.log(res);
            if (res?.data.result == 201) {
              navigate("/main");
            } else {
              localStorage.setItem("socialType", socialType);
              localStorage.setItem("email", email);
              localStorage.setItem("uid", uid);
              navigate("/onboarding?specialQuery=true");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => console.log(err));
  };

  const { mutateAsync: sendAppleData } = usePostAppleData();

  const loginWithApple = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    window.AppleID.auth.init({
      clientId: import.meta.env.VITE_APPLE_CLIENT_ID,
      scope: "name email",
      redirectURI: import.meta.env.VITE_APPLE_REDIRECT_URI,
      state: "state_parameter",
      nonce: "random_nonce",
      usePopup: true,
    });

    try {
      const res = await window.AppleID.auth.signIn();
      const apiResponse = await sendAppleData(res);
      console.log("apiResponse", apiResponse);
      if (res?.user) {
        navigate("/onboarding?specialQuery=true");
      } else {
        navigate("/main");
      }
    } catch (error) {
      console.error("Apple sign-in error:", error);
    }
  };

  return (
    <div className="flex flex-col">
      <OnboardingTitle />
      <SocialLoginButtons
        onKakaoLogin={handleKakaoLogin}
        onGoogleLogin={handleGoogleLogin}
        onAppleLogin={loginWithApple}
      />
    </div>
  );
};

export default Zero;
