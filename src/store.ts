import { combineReducers, createStore } from "redux";
import userReducer from "@/reducer/userReducers";
import { UserData } from "@/types/login/UserType";

// 루트 상태 정의
export interface RootState {
  accessToken: string | null;
  user: UserData | null;
}

// 루트 리듀서
const rootReducer = combineReducers({
  user: userReducer,
});

// 스토어 생성
const store = createStore(rootReducer);

export default store;
