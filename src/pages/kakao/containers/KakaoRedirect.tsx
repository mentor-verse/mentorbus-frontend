declare global {
  interface Window {
    Kakao: any;
  }
}

import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { useEffect } from "react";
import axios from "axios";
import qs from "qs";

import { isLoggedInAtom } from "@/atoms/isLoggedInAtom";

const Rest_api_key = import.meta.env.VITE_KAKAO_REST_API_KEY; // REST API KEY
const redirect_uri = import.meta.env.VITE_KAKAO_REDIRECT_URI;

export function KakaoRedirect() {
  const navigate = useNavigate();
  const setIsLoggedIn = useSetRecoilState(isLoggedInAtom);

  const params = new URL(document.URL).searchParams;
  const code = params.get("code");

  const getToken = async () => {
    const payload = qs.stringify({
      grant_type: "authorization_code",
      client_id: Rest_api_key,
      redirect_uri: redirect_uri,
      code: code,
    });
    try {
      const res = await axios.post(
        "https://kauth.kakao.com/oauth/token",
        payload
      );
      window.Kakao.init(Rest_api_key); // Kakao Javascript SDK 초기화
      window.Kakao.Auth.setAccessToken(res.data.access_token); // access token 설정
      localStorage.setItem("kakaoToken", res.data.access_token); // Store token in localStorage
      setIsLoggedIn(true);
      navigate("/mentorbus-frontend/onboarding");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <div>
      <h1>로그인 중입니다.</h1>
    </div>
  );
}

export default KakaoRedirect;
