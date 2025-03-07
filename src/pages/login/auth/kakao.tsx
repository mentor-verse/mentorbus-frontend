import { fetchLogin } from "@/controllers/api";
import { auth } from "@/firebase";
import axios from "axios";
import {
  browserSessionPersistence,
  OAuthProvider,
  setPersistence,
  signInWithCredential,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const KakaoLoginRedirect = () => {
  const navigate = useNavigate();

  const [didMount, setDidMount] = useState(false);

  const socialType = "KAKAO";
  const code = new URL(window.location.href).searchParams.get("code");

  const getKakaoAuthToken = async () => {
    if (!code) return;

    const payload = {
      grant_type: "authorization_code",
      client_id: import.meta.env.VITE_KAKAO_REST_API_KEY,
      redirect_uri: import.meta.env.VITE_KAKAO_REDIRECT_URI,
      code,
      client_secret: import.meta.env.VITE_KAKAO_CLIENT_SECRET,
    };

    try {
      const req = await axios.post(
        "https://kauth.kakao.com/oauth/token",
        payload,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      );
      console.log(req);
      const provider = new OAuthProvider("oidc.kakao");
      const credential = provider.credential({
        idToken: req.data.id_token,
      });
      setPersistence(auth, browserSessionPersistence).then(() => {
        signInWithCredential(auth, credential)
          .then((result) => {
            const uid = result.user.uid;
            const name = result.user.displayName;
            const email = name; //비즈앱 신청 전 대체

            // const credential = OAuthProvider.credentialFromResult(result);
            // const acToken = credential?.accessToken;
            // const idToken = credential?.idToken;

            fetchLogin(socialType, uid, email)
              .then((res) => {
                if (res.data.status == 200) {
                  navigate("/");
                } else {
                  if (
                    window.confirm(
                      `로그인 정보를 찾지 못했습니다\n회원가입하시겠습니까?`
                    )
                  )
                    navigate("/register", { state: { socialType } });
                  else {
                    navigate("/login");
                  }
                }
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setDidMount(true);
  }, []);

  useEffect(() => {
    if (!didMount) return;
    getKakaoAuthToken();
  }, [didMount]);

  return <div>로그인 중...</div>;
};

export default KakaoLoginRedirect;
