import LoginBus from "@/assets/onBoardingLoginBus.svg?react";

import LogoSVG from "@/assets/Logo.svg?react";

import { KakaoBtn } from "@/components/Icons/KakaoBtn";
import { GoogleBtn } from "@/components/Icons/GoogleBtn";
import { AppleBtn } from "@/components/Icons/AppleBtn";

import OnBoardingLayout from "@/layout/onboarding";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { useNavigate } from "react-router-dom";
import { fetchLogin } from "@/controllers/api";
import { useEffect } from "react";

const LoginComponent = () => {
  const navigate = useNavigate();

  const onKakaoLogin = () => {
    const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${
      import.meta.env.VITE_KAKAO_REST_API_KEY
    }&redirect_uri=${encodeURIComponent(
      import.meta.env.VITE_KAKAO_REDIRECT_URI
    )}&response_type=code`;

    window.location.href = kakaoLoginUrl;
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

        fetchLogin(socialType, uid, email).then((res) => {
          if (res.data.status == 200) {
            navigate("/");
          } else {
            if (
              window.confirm(
                `로그인 정보를 찾지 못했습니다\n회원가입하시겠습니까?`
              )
            )
              navigate("/register", { state: { socialType } });
            else {
              navigate("/login");
            }
          }
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
    </div>
  );
};

const LoginPage = () => {
  useEffect(() => {
    signOut(auth);
  }, []);

  return (
    <OnBoardingLayout>
      <LoginBus className="absolute bottom-0 w-full h-auto" />
      <LoginComponent />
    </OnBoardingLayout>
  );
};

export default LoginPage;
