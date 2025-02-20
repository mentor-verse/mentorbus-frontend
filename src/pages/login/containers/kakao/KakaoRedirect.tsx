import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { kakaoAuthCodeApi } from "@/apis/kakaoLoginApi";
import { useGetProfile } from "@/hooks/useGetProfile";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import {
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
  const queryClient = useQueryClient();

  const [userId, setUserId] = useState<number | null>();
  const [userData, setUserData] = useState<UserData | undefined>();

  const { data: respData, refetch } = useGetProfile(
    { userId: userId! },
    { enabled: !!userId }
  );

  useEffect(() => {
    if (userId) {
      refetch();
    }
  }, [userId, refetch]);

  useEffect(() => {
    if (respData) {
      setUserData(respData);
      dispatch(loginSuccess(respData));
    }
  }, [respData, dispatch]);

  useEffect(() => {
    if (!queryClient.getQueryData(["getProfile"])) {
      refetch();
    }
  }, [queryClient, refetch]);

  useEffect(() => {
    const kakaoLogin = async () => {
      try {
        const response = await kakaoAuthCodeApi(AUTHORIZE_CODE);
        const res = response.data;
        console.log("id", res.data.id);
        setUserId(res.data.id);
        console.log("respData", respData);
        setUserData(respData);

        if (userData) {
          dispatch(loginSuccess(userData));
        } else {
          console.warn("userData is undefined, not dispatching.");
        }

        console.log("userData", userData);

        if (res.code === "200") {
          if (res.data.isFirst) {
            navigate("/onboardidng");
          } else {
            navigate("/main");
            console.log("respData", respData);
          }
        } else {
          alert("로그인에 실패했습니다");
        }
      } catch (err) {
        console.log(err);
      }
    };

    kakaoLogin();
  }, [AUTHORIZE_CODE, dispatch, navigate]);

  return <div>Loading…</div>;
};

export default KakaoRedirect;
