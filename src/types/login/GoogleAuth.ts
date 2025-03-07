export interface SignInRequest {
  redirectUri: string;
  token: string;
}

export interface SignInResponse {
  user: any;
  accessToken: string;
  refreshToken: string;
  isFirst?: boolean; // 최초 로그인 여부
}

export interface SignUpRequest {
  redirectUri: string;
  token: string;
  nickname: string;
}
