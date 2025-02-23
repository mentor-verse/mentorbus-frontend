import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInUser, signUpUser } from "@/apis/googleAuth";
import { getGoogleAccessToken } from "@/hooks/login/useGoogleOAuth";
import { useGetProfile } from "@/hooks/useGetProfile";
import { useDispatch } from "react-redux";
import {
  LOGIN_SUCCESS,
  UserActionTypes,
  UserData,
} from "@/types/login/UserType";

// 구글 로그인 처리 함수
async function handleGoogleLogin(
  googleRedirectUri: string,
  googleAccessToken: string
) {
  return await signInUser("google", {
    redirectUri: googleRedirectUri,
    token: googleAccessToken,
  });
}

// 구글 회원가입 처리 함수
async function handleGoogleSignup(
  googleRedirectUri: string,
  googleAccessToken: string
) {
  const response = await signUpUser("google", {
    redirectUri: googleRedirectUri,
    token: googleAccessToken,
    nickname: "test",
  });
  if (response?.user?.id) {
    localStorage.setItem("userId", response.user.id);
    return response;
  } else {
    throw new Error("회원가입 실패: 사용자 정보가 없습니다.");
  }
}

const loginSuccess = (userData: UserData): UserActionTypes => ({
  type: LOGIN_SUCCESS,
  payload: userData,
});

export function useGoogleOAuthHandler(googleRedirectUri: string) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userId, setUserId] = useState<number | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);

  const { data: respData, refetch } = useGetProfile(
    { userId: userId },
    { enabled: false }
  );

  useEffect(() => {
    if (respData) {
      setUserData(respData);
      dispatch(loginSuccess(respData));
    }
  }, [respData, dispatch]);

  useEffect(() => {
    if (userId) {
      refetch();
      localStorage.setItem("userId", String(userId));
    }
  }, [userId, refetch]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (!code) return;

    (async () => {
      try {
        console.log("OAuth 코드 발견:", code);
        // 1. 구글 액세스 토큰 교환
        const googleAccessToken = await getGoogleAccessToken(code);
        console.log("액세스 토큰 획득:", googleAccessToken);

        // 2. 구글 로그인 시도
        try {
          const loginResponse = await handleGoogleLogin(
            googleRedirectUri,
            googleAccessToken
          );
          console.log("로그인 성공:", loginResponse);
          setUserId(loginResponse.user.id);
        } catch (loginError: any) {
          console.error("로그인 실패:", loginError);
          console.log(
            "로그인 에러 메시지:",
            loginError.response?.data?.message
          );
          // 로그인 실패 메시지가 "User not found"를 포함하는 경우 회원가입 시도
          if (
            loginError.response &&
            loginError.response.data &&
            loginError.response.data.message &&
            loginError.response.data.message.includes("User not found")
          ) {
            try {
              const signUpResponse = await handleGoogleSignup(
                googleRedirectUri,
                googleAccessToken
              );
              console.log("회원가입 성공:", signUpResponse);
              navigate("/onboarding?specialQuery=true");
              window.location.reload();
            } catch (signUpError) {
              console.error("회원가입 오류:", signUpError);
            }
          } else {
            // 다른 로그인 오류는 그대로 처리
          }
        }
      } catch (error) {
        console.error("전체 OAuth 처리 오류:", error);
      }
    })();
  }, [navigate, googleRedirectUri]);

  useEffect(() => {
    if (userData) {
      navigate("/main");
    }
  }, [userData, navigate]);
}
