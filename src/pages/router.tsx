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
      <Route path="/" element={<Onboarding />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/kakao" element={<Kakao />} />
      <Route path="/oauth" element={<KakaoRedirect />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/find" element={<FindMentor />} />
      <Route path="/qabus" element={<QAPage />} />
      <Route path="/mentorinfo" element={<MentorPage />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/mentorbus" element={<MentorBusPage />} />



    </Routes>
  );
}
