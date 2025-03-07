import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getGoogleAccessToken } from "@/hooks/login/useGoogleOAuth";
import { signInUser } from "@/apis/postGoogleAuth";
import { setCookie } from "cookies-next";

export default function GoogleLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleOAuthCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");

      if (code) {
        try {
          const googleAccessToken = await getGoogleAccessToken(code);
          const signInResponse = await signInUser("google", {
            redirectUri: import.meta.env.GOOGLE_REDIRECT_URI || "",
            token: googleAccessToken,
          });

          console.log("로그인 성공:", signInResponse);
          setCookie("accessToken", signInResponse.accessToken, {
            path: "/",
            secure: true,
            sameSite: "strict",
          });
          setCookie("refreshToken", signInResponse.refreshToken, {
            path: "/",
            secure: true,
            sameSite: "strict",
          });

          navigate("/activities");
        } catch (error) {
          console.error("로그인 오류:", error);
          navigate("/signup");
        } finally {
          setLoading(false);
        }
      }
    };

    handleOAuthCallback();
  }, [navigate]);

  return <div>{loading && <p>로딩중입니다.</p>}</div>;
}
