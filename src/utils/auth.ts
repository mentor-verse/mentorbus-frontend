// src/utils/auth.ts
export const getKakaoToken = () => localStorage.getItem("kakaoToken");
export const setKakaoToken = (token: string) =>
  localStorage.setItem("kakaoToken", token);
export const clearKakaoToken = () => localStorage.removeItem("kakaoToken");
export const getStoredUserData = () =>
  JSON.parse(localStorage.getItem("transformedUserData") || "null");
export const setStoredUserData = (data: unknown) =>
  localStorage.setItem("transformedUserData", JSON.stringify(data));
export const clearStoredUserData = () =>
  localStorage.removeItem("transformedUserData");
