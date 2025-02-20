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
import { getProfileResDto } from "@/types/get";

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
  const [userId, setUserId] = useState<number>();
  const [userData, setUserData] = useState<getProfileResDto | undefined>();

  const { data: resp, refetch } = useGetProfile({ userId: userId });

  useEffect(() => {
    if (!queryClient.getQueryData(["get-profile"])) {
      refetch();
    }
  }, [queryClient, refetch]);

  useEffect(() => {
    if (resp?.data && resp.data.length > 0) {
      const profile = resp.data[0];
      setUserData(profile);
      dispatch(loginSuccess(profile));
    }
  }, [dispatch, resp, userData]);

  useEffect(() => {
    const kakaoLogin = async () => {
      try {
        const response = await kakaoAuthCodeApi(AUTHORIZE_CODE);
        const res = response.data;
        setUserId(response.data.data.id);

        if (res.code === "200") {
          if (res.data.isFirst) {
            navigate("/onboardidng");
          } else {
            navigate("/");
          }
        } else {
          alert("로그인에 실패했습니다");
        }
      } catch (err) {
        console.log(err);
      }
    };

    kakaoLogin();
  }, [AUTHORIZE_CODE, navigate]);

  return <div>Loading…</div>;
};

export default KakaoRedirect;
