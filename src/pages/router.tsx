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
import { Sam } from "./main/sam";
import { CommentPage } from "./qa/containers/CommentPage";
import { ApplyAnswerPage } from "./qa/containers/ApplyAnswerPage";
import { useState } from "react";
import { ApplyQuestionPage } from "./qa/containers/ApplyQuestionPage";

export function MainRouter() {
  const [, setAnswer] = useState(""); // 상태 선언

  return (
    <Routes>
      <Route path="/mentorbus-frontend" element={<Onboarding />} />
      <Route path="/mentorbus-frontend/onboarding" element={<Onboarding />} />
      <Route path="/mentorbus-frontend/kakao" element={<Kakao />} />
      <Route path="/mentorbus-frontend/oauth" element={<KakaoRedirect />} />
      <Route path="/mentorbus-frontend/profile" element={<Profile />} />
      <Route path="/mentorbus-frontend/main" element={<MainPage />} />
      <Route path="/mentorbus-frontend/find" element={<FindMentor />} />
      <Route path="/mentorbus-frontend/find/:school" element={<FindMentor />} />
      {/* 학교별 멘토링 찾기 링크 */}
      <Route path="/mentorbus-frontend/qabus" element={<QAPage />} />
      <Route path="/mentorbus-frontend/mentorinfo" element={<MentorPage />} />
      <Route path="/mentorbus-frontend/mypage" element={<MyPage />} />
      <Route path="/mentorbus-frontend/mentorbus" element={<MentorBusPage />} />
      <Route
        path="/mentorbus-frontend/comment"
        element={<CommentPage Link={""} back_disable={""} back_work={"yes"} />}
      />
      <Route
        path="/mentorbus-frontend/comment/:index"
        element={<CommentPage Link={""} back_disable={""} back_work={"yes"} />}
      />
      <Route path="/mentorbus-frontend/sam" element={<Sam />} />
      <Route
        path="/mentorbus-frontend/applyanswer"
        element={
          <ApplyAnswerPage Link={""} back_disable={""} back_work={"yes"} />
        }
      />

      <Route
        path="/mentorbus-frontend/applyquestion"
        element={
          <ApplyQuestionPage
            setAnswer={setAnswer}
            Link={""}
            back_disable={""}
            back_work={"yes"}
          />
        }
      />
    </Routes>
  );
}
