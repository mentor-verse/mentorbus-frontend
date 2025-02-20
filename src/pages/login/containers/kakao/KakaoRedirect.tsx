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

  const [userId, setUserId] = useState<number | null>();
  const [, setUserData] = useState<getProfileResDto | undefined>();

  const { data: resp, refetch } = useGetProfile(
    { userId: userId! },
    { enabled: !!userId }
  );

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

        // 로그인 성공 후 프로필 데이터가 있다면 처리
        if (res.code === "200") {
          if (res.data.isFirst) {
            navigate("/onboardidng");
          } else {
            navigate("/main");
          }
        } else {
          alert("로그인에 실패했습니다");
        }
      } catch (err) {
        console.log(err);
      }
    };

    kakaoLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [AUTHORIZE_CODE]);

  useEffect(() => {
    if (resp?.data && resp.data.length > 0) {
      const profile = resp.data[0];
      setUserData(profile);
      dispatch(loginSuccess(profile));
      console.log("userData", profile);
      console.log("저장성공");
    }
  }, [resp, dispatch]);

  return <div>Loading…</div>;
};

export default KakaoRedirect;
