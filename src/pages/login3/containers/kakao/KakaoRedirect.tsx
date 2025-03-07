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

  const { data: respData, refetch } = useGetProfile(
    { userId: userId },
    { enabled: false }
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
      }
    };

    kakaoLogin();
  }, [AUTHORIZE_CODE]);

  useEffect(() => {
    if (userId) {
      refetch();
      localStorage.setItem("userId", String(userId));
    }
  }, [userId, refetch]);

  useEffect(() => {
    if (respData) {
      setUserData(respData);
      dispatch(loginSuccess(respData));
    }
  }, [respData, dispatch]);

  useEffect(() => {
    if (userData && kakaoData) {
      navigate(
        kakaoData?.data?.isFirst ? "/onboarding?specialQuery=true" : "/main"
      );
    }
  }, [userData, kakaoData, navigate]);

  return <div>Loading…</div>;
};

export default KakaoRedirect;
