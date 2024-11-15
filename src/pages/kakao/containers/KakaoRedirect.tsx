// kakaoRedirect.tsx

declare global {
  interface Window {
    Kakao: any;
    Android: any; // Android 인터페이스를 선언
  }
}

import { useNavigate, useSearchParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { useEffect, useCallback, useState } from "react";
import { isLoggedInAtom } from "@/atoms/isLoggedInAtom";
import getToken from "../containers/apis/getToken";
import axios from "axios";

export function KakaoRedirect() {
  const navigate = useNavigate();
  const setIsLoggedIn = useSetRecoilState(isLoggedInAtom);
  const [searchParams] = useSearchParams();
  const [kakaoId, setKakaoId] = useState();

  const handleLogin = useCallback(
    async (code: string) => {
      try {
        const transformedUserData = await getToken(code);
        console.log("Transformed User Data:", transformedUserData);

        // 로그인 성공 시 상태 업데이트 및 페이지 이동
        setIsLoggedIn(true);
        navigate("/onboarding");

        // 서버에 로그인 데이터 전송
        await sendLoginDataToServer(transformedUserData);

        // 안드로이드 앱에 로그인 성공 알림
        if (window.Android) {
          window.Android.onLoginSuccess();
        }
      } catch (error: unknown) {
        console.error("Error fetching user data:", error);

        // 안드로이드 앱에 로그인 오류 알림
        if (window.Android) {
          const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
          window.Android.onLoginError(errorMessage);
        }
      }
    },
    [navigate, setIsLoggedIn]
  );

  const sendLoginDataToServer = async (data: any) => {
    try {
      const response = await fetch(
        "https://port-0-mentorbus-backend-m0zjsul0a4243974.sel4.cloudtype.app/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      // 응답 상태 코드 확인
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      const result = await response.json();
      console.log("Server response:", result);
      console.log("data", data?.data?.id);

      setKakaoId(data?.data?.id);
      // kakaoId가 있을 때 백엔드 API 호출
      if (data?.data?.id) {
        // 백엔드 API 호출
        axios
          .get(
            `https://port-0-mentorbus-backend-m0zjsul0a4243974.sel4.cloudtype.app/onboarding/userdata/${data?.data?.id}`
          )
          .then((response: { data: { position: any } }) => {
            // 성공적으로 데이터를 가져왔을 때
            console.log(response.data);
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
          });
      }

      if (result.message === "Kakao login data already exists") {
        console.log("kakaoId", kakaoId);
        // 조건이 만족되면 /main으로 이동
        // 백엔드 API 호출
        axios
          .get(
            `https://port-0-mentorbus-backend-m0zjsul0a4243974.sel4.cloudtype.app/onboarding/userdata/${data?.data?.id}`
          )
          .then(
            (response: {
              data: {
                interest: string;
                school: string;
                want: string;
                major: string;
                nickname: string;
                position: string;
              };
            }) => {
              // 성공적으로 데이터를 가져왔을 때
              console.log(response.data);
              if (response.data.position == "멘티") {
                localStorage.setItem("userName", response.data.nickname);
                localStorage.setItem("userBelong", response.data.school);
                localStorage.setItem("position", response.data.position);
                localStorage.setItem("major", response.data.interest);
                localStorage.setItem("favor", response.data.want);
              } else {
                localStorage.setItem("userName", response.data.nickname);
                localStorage.setItem("userBelong", response.data.job);
                localStorage.setItem("position", response.data.position);
                localStorage.setItem("major", response.data.major);
              }

              navigate("/main");
            }
          )
          .catch((error) => {
            console.error("Error fetching user data:", error);
          });
      }

      // 서버 응답에서 kakao_id를 로컬 스토리지에 저장
      if (result?.id) {
        localStorage.setItem("kakao_id", result.id);
      } else {
        throw new Error("Invalid response: kakao_id missing");
      }
    } catch (error) {
      console.error("Error sending login data to server:", error);
    }
  };

  useEffect(() => {
    const code = searchParams.get("code");

    if (code) {
      handleLogin(code);
    }
  }, [searchParams, handleLogin]);

  return (
    <div>
      <h1>로그인 중입니다...</h1>
    </div>
  );
}

export default KakaoRedirect;
