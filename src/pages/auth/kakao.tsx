import { auth } from "@/firebase";
import axios from "axios";
import {
  browserSessionPersistence,
  OAuthProvider,
  setPersistence,
  signInWithCredential,
} from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const fetchLogin = async (
  socialType: string,
  uid: string,
  email: string | null
) => {
  return await axios
    .post(`http://localhost:3000/member/login/${socialType}`, {
      uid: uid,
      email: email,
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error(err);
      return null;
    });
};

const KakaoLoginRedirect = () => {
  const navigate = useNavigate();

  const REST_API_KEY = "12a0588158a206cf61adb5ca7ebc218a";
  const REDIRECT_URI = "http://localhost:5173/auth/kakao/callback";
  const CLIENT_SECRET = "ceg2AyBSBHcvlqoB2rC3hIXvDzqARioE";

  const socialType = "KAKAO";
  const code = new URL(window.location.href).searchParams.get("code");

  const getKakaoAuthToken = async () => {
    if (!code) return;

    const payload = {
      grant_type: "authorization_code",
      client_id: REST_API_KEY,
      redirect_uri: REDIRECT_URI,
      code,
      client_secret: CLIENT_SECRET,
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
            console.log(name);
            const email = name; //비즈앱 신청 전 대체
            console.log(result);

            const credential = OAuthProvider.credentialFromResult(result);
            const acToken = credential?.accessToken;
            const idToken = credential?.idToken;
            // setUsername(result.user.displayName);

            fetchLogin(socialType, uid, email)
              .then((res) => {
                console.log(res);
                if (res?.data.status == 200) {
                  navigate("/");
                } else {
                  navigate("/register", { state: { socialType } });
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
    getKakaoAuthToken();
  }, []);

  return <div>로그인 중...</div>;
};

export default KakaoLoginRedirect;
