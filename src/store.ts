import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import userReducer from "@/reducer/userReducers";
import { UserData } from "@/types/login/UserType";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// 루트 상태 정의
export interface RootState {
  accessToken: string | null;
  user: UserData | null;
}

const persistConfig = {
  key: "root",
  storage,
};

// 루트 리듀서
const rootReducer = combineReducers({
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// 스토어 생성
const store = configureStore({
  reducer: persistedReducer,
});

export default store;
