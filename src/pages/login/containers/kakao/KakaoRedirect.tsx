import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { kakaoAuthCodeApi } from "@/apis/kakaoLoginApi";
import { useGetProfile } from "@/hooks/useGetProfile";
import { useDispatch } from "react-redux";
import {
  KakaoUserType,
  LOGIN_SUCCESS,
  UserActionTypes,
  UserData,
} from "@/types/login/UserType";

const loginSuccess = (userData: UserData): UserActionTypes => ({
  type: LOGIN_SUCCESS,
  payload: userData,
});

const KakaoRedirect = () => {
  const AUTHORIZE_CODE: string = new URLSearchParams(
    window.location.search
  ).get("code")!;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userId, setUserId] = useState<number | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [kakaoData, setKakaoData] = useState<KakaoUserType | null>(null);

  // userId가 null이면 undefined 전달하여 useQuery 실행을 방지
  const { data: respData, refetch } = useGetProfile(
    { userId: userId },
    { enabled: false } // 기본적으로 자동 실행 X
  );

  useEffect(() => {
    const kakaoLogin = async () => {
      try {
        const response = await kakaoAuthCodeApi(AUTHORIZE_CODE);
        const res = response.data;
        console.log("id", res.data.id);

        setUserId(res.data.id);
        setKakaoData(res);
      } catch (err) {
        console.error("카카오 로그인 실패:", err);
        alert("로그인에 실패했습니다");
      }
    };

    kakaoLogin();
  }, [AUTHORIZE_CODE]);

  useEffect(() => {
    if (userId) {
      console.log("Fetching profile for userId:", userId);
      refetch()
        .then(() => {
          console.log("Profile fetched successfully");
        })
        .catch((err) => {
          console.error("Profile fetch error:", err);
        });
    }
  }, [userId, refetch]);

  useEffect(() => {
    if (respData) {
      console.log("Profile data received:", respData);
      setUserData(respData);
      dispatch(loginSuccess(respData));
    }
  }, [respData, dispatch]);

  useEffect(() => {
    if (userData && kakaoData) {
      console.log("Navigating based on user data", userData);
      navigate(kakaoData?.data?.isFirst ? "/onboarding" : "/main");
    }
  }, [userData, kakaoData, navigate]);

  return <div>Loading…</div>;
};

export default KakaoRedirect;
