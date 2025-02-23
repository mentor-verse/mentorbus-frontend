export interface KakaoUserType {
  code: string;
  message: string;
  data: {
    id: number;
    name: string | null;
    email: string | null;
    gen: string | null;
    accessToken: string;
    refreshToken: string;
    profileImage: string | null;
    isFirst: boolean;
    createdAt: null | string;
  };
  isSuccess: boolean;
}

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

export interface UserData {
  userId: number; //사용자 아이디
  userName: string; //사용자 닉네임
  isMentor: boolean; //멘토, 멘티 여부
  job: string; //멘토일 경우 소속 혹은 직장, 멘티라면 null
  major: string; //멘토일 경우 전문분야, 멘티라면 null
  school: string; //멘티일 경우 소속학교, 멘토라면 null
  interest?: string | null; //멘티일 경우 관심사, 멘토라면 null
  level?: number; //멘티일 경우 관심사, 멘토라면 null
}

export interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: UserData;
  [extraProps: string]: any;
}

export type UserActionTypes = LoginSuccessAction;
