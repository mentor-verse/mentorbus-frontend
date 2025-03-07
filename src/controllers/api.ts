import axios from "axios";

const wait = (timeToDelay: number) =>
  new Promise((resolve) => setTimeout(resolve, timeToDelay));

const postData = async (path: string, data: any) => {
  return await axios
    .post(`${import.meta.env.VITE_BACKEND_API_URL}${path}`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

const getData = async (path: string) => {
  return await axios
    .get(`${import.meta.env.VITE_BACKEND_API_URL}${path}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const fetchLogin = async (
  socialType: string,
  uid: string,
  email: string | null
) => {
  return postData(`/member/login/${socialType}`, {
    uid: uid,
    email: email,
  });
};

interface UserInfo {
  uid: string;
  email: string;
  nickname: string;
  socialType: "DEFAULT" | "GOOGLE" | "APPLE" | "KAKAO" | "NAVER";
  profileImage?: string;
  userType: "MENTOR" | "MENTEE";
  affiliation: string;
  major: string;
  interest: string;
}

export const fetchRegister = async (userInfo: UserInfo) => {
  return postData("/member/register", userInfo);
};

export const fetchCheckNickname = async (nickname: string) => {
  return getData(`/member/check-nickname?nickname=${nickname}`);
};
