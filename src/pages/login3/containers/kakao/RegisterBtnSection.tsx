import { Link } from "react-router-dom";
import { KakaoButton } from "@/assets/Logo/KakaoBtn";

const rest_api_key = import.meta.env.VITE_KAKAO_REST_API_KEY;
const redirect_uri = import.meta.env.VITE_KAKAO_REDIRECT_URI;

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${rest_api_key}&redirect_uri=${redirect_uri}`;

const handleLogin = () => {
  window.location.href = KAKAO_AUTH_URL;
};

export function RegisterBtnSection() {
  return (
    <div
      style={{
        minHeight: "0vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        overflowY: "hidden",
      }}
    >
      <div className="flex flex-col items-center text-center">
        <h1 className="mb-[-10px] text-xs font-normal">제64대 총학생회</h1>
        <h1 className="text-[56px] font-bold">US:SUM</h1>
        <div onClick={handleLogin}>
          <KakaoButton />
        </div>
        <Link to={""}>
          <div className="mt-[20px] text-[12px] font-medium not-italic leading-[130%] text-[#828282] underline">
            로그인
          </div>
        </Link>
      </div>
    </div>
  );
}
