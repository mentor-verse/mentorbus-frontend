import LoginBus from "@/assets/onBoardingLoginBus.svg?react";

import Cloud from "@/assets/Cloud.svg?react";
import Cloud2 from "@/assets/Cloud2.svg?react";

import LogoSVG from "@/assets/Logo.svg?react";

import { KakaoBtn } from "@/components/Icons/KakaoBtn";
import { GoogleBtn } from "@/components/Icons/GoogleBtn";
import { AppleBtn } from "@/components/Icons/AppleBtn";

import OnBoardingLayout from "@/layout/onboarding";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "@/firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

const LoginComponent = () => {
  const navigate = useNavigate();

  const onKakaoLogin = () => {
    // export const REST_API_KEY = process.env.REACT_APP_REST_API_KEY as string;
    // export const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI as string;
    // export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    // export const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET as string;
    // export const KAKAO_APP_KEY = process.env.REACT_APP_KAKAO_APP_KEY as string;

    const REST_API_KEY = "12a0588158a206cf61adb5ca7ebc218a";
    const REDIRECT_URI = "http://localhost:5173/auth/kakao/callback";
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    const CLIENT_SECRET = "ceg2AyBSBHcvlqoB2rC3hIXvDzqARioE";
    const KAKAO_APP_KEY = "700c958f24179e214a46bfa26f87defb";

    console.log("kakao");
    const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&response_type=code`;
    window.location.href = kakaoLoginUrl;

    // window.open(kakaoLoginUrl);
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    // console.log(await auth.currentUser?.getIdToken());
    await signInWithPopup(auth, provider)
      .then(async (data) => {
        const uid = data.user.uid;
        const socialType = "GOOGLE";
        const email = data.user.email ?? "";
        console.log(data);

        fetchLogin(socialType, uid, email)
          .then((res) => {
            console.log(res);
            if (res?.data.status == 200) {
              navigate("/");
            } else {
              navigate("/register", { state: { socialType } });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => console.log(err));
  };

  const onAppleLogin = () => {
    console.log("apple");
  };

  return (
    <div className="absolute  w-full h-full flex flex-col justify-center gap-6 pb-64">
      <div className="flex flex-col justify-center items-center gap-2">
        <p className="text-xl text-white font-medium">
          대학생과 청소년을 <b>메타버스</b>에서 잇다
        </p>
        <LogoSVG className="w-1/3 h-auto" />
      </div>
      <div className="flex gap-4 justify-center">
        <div className="cursor-pointer" onClick={onKakaoLogin}>
          <KakaoBtn />
        </div>
        <div className="cursor-pointer" onClick={handleGoogleLogin}>
          <GoogleBtn />
        </div>
        <div className="cursor-pointer" onClick={onAppleLogin}>
          <AppleBtn />
        </div>
      </div>
      <div onClick={() => signOut(auth)}>로그아웃</div>
    </div>
  );
};

const LoginPage = () => {
  return (
    <OnBoardingLayout>
      <div>
        <div className="absolute top-[10vh] right-0">
          <Cloud />
        </div>
        <div className="absolute left-0 top-[20vh]">
          <Cloud2 />
        </div>
      </div>
      <LoginBus className="absolute bottom-0 w-full h-auto" />
      <LoginComponent />
    </OnBoardingLayout>
  );
};

export default LoginPage;
