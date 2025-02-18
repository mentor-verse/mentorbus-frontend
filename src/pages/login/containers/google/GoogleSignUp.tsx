import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getGoogleAccessToken } from "@/hooks/login/useGoogleOAuth";
import { signUpUser } from "@/apis/postGoogleAuth";

export default function GoogleSignUp() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleOAuthCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");

      if (code) {
        try {
          const googleAccessToken = await getGoogleAccessToken(code);
          await signUpUser("google", {
            redirectUri: import.meta.env.GOOGLE_REDIRECT_URI || "",
            token: googleAccessToken,
          });

          console.log("회원가입 성공!");
          navigate("/onboarding");
        } catch (error) {
          console.error("회원가입 오류:", error);
          navigate("/login");
        } finally {
          setLoading(false);
        }
      }
    };

    handleOAuthCallback();
  }, [navigate]);

  return <div>{loading && <p>로딩중입니다.</p>}</div>;
}
