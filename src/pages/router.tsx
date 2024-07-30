import { Routes, Route } from "react-router-dom";
import { MainPage } from "./main/page";
import { Onboarding } from "./onboarding/page";
import Kakao from "./kakao/page";
import KakaoRedirect from "./kakao/containers/KakaoRedirect";
import { Profile } from "./kakao/containers/Profile";
import { FindMentor } from "./findmentor/page";
import { QAPage } from "@/pages/qa/page";
import { MentorPage } from "./findmentor/containers/MentorPage";
import { MyPage } from "./mypage/page";
import { MentorBusPage } from "./mentorbus/page";

export function MainRouter() {
  return (
    <Routes>
      <Route path="/mentorbus-frontend" element={<Onboarding />} />
      <Route path="/mentorbus-frontend/onboarding" element={<Onboarding />} />
      <Route path="/mentorbus-frontend/kakao" element={<Kakao />} />
      <Route path="/mentorbus-frontend/oauth" element={<KakaoRedirect />} />
      <Route path="/mentorbus-frontend/profile" element={<Profile />} />
      <Route path="mentorbus-frontend/main" element={<MainPage />} />
      <Route path="mentorbus-frontend/find" element={<FindMentor />} />
      <Route path="/mentorbus-frontend/qabus" element={<QAPage />} />
      <Route path="/mentorbus-frontend/mentorinfo" element={<MentorPage />} />
      <Route path="/mentorbus-frontend/mypage" element={<MyPage />} />
      <Route path="/mentorbus-frontend/mentorbus" element={<MentorBusPage />} />



    </Routes>
  );
}
