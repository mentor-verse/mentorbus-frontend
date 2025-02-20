import {
  LOGIN_SUCCESS,
  UserActionTypes,
  UserData,
} from "@/types/login/UserType";

// 초기 상태 정의
const initialState: UserData | null = null;

// 리듀서 함수 정의
const userReducer = (
  state = initialState,
  action: UserActionTypes
): UserData | null => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

export default userReducer;
