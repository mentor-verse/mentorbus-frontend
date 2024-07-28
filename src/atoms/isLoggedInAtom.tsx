import { atom } from "recoil";

// 로그인 상태를 전역적으로 관리하기 위한 atom
export const isLoggedInAtom = atom({
 // 해당 atom에 대한 유일한 ID
 key: "isLoggedIn",
 // 기본값은 false(비로그인 상태)
 default: false,
});
