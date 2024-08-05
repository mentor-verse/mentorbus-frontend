// src/components/KakaoRedirect.tsx
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { useEffect, useCallback } from "react";
import axios from "axios";
import qs from "qs";
import { isLoggedInAtom } from "@/atoms/isLoggedInAtom";
import { setKakaoToken } from "@/utils/auth";

const Rest_api_key = import.meta.env.VITE_KAKAO_REST_API_KEY; // REST API KEY
const redirect_uri = import.meta.env.VITE_KAKAO_REDIRECT_URI;

export function KakaoRedirect() {
  const navigate = useNavigate();
  const setIsLoggedIn = useSetRecoilState(isLoggedInAtom);
  const [searchParams] = useSearchParams();

  const getToken = useCallback(
    async (code: string) => {
      const payload = qs.stringify({
        grant_type: "authorization_code",
        client_id: Rest_api_key,
        redirect_uri: redirect_uri,
        code: code,
      });
      try {
        const res = await axios.post(
          "https://kauth.kakao.com/oauth/token",
          payload,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        window.Kakao.init(Rest_api_key); // Kakao Javascript SDK 초기화
        window.Kakao.Auth.setAccessToken(res.data.access_token); // access token 설정
        setKakaoToken(res.data.access_token); // Store token in localStorage
        setIsLoggedIn(true);
        navigate("/mentorbus-frontend/onboarding"); // 일관된 경로 사용
      } catch (err) {
        console.log(err);
      }
    },
    [navigate, setIsLoggedIn]
  );

  useEffect(() => {
    const code = searchParams.get("code");

    if (code) {
      getToken(code)
        .then(() => {
          navigate("/mentorbus-frontend/onboarding"); // 일관된 경로 사용
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [searchParams, getToken, navigate]);

  return (
    <div>
      <h1>로그인 중입니다.</h1>
    </div>
  );
}

export default KakaoRedirect;
