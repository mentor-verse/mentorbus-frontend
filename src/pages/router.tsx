import { Routes, Route } from "react-router-dom";
import { MainPage } from "./main/page";
import { Onboarding } from "./onboarding/page";
import Kakao from "./login/page";
import KakaoRedirect from "./login/containers/kakao/KakaoRedirect";
import { FindMentor } from "./findmentor/page";
import { QAPage } from "@/pages/qa/page";
import { MentorPage } from "./findmentor/containers/MentorPage";
import { MyPage } from "./mypage/page";
import { MentorBusPageMentee, MentorBusPageMentor } from "./mentorbus/page";
import { CommentPage } from "./qa/containers/CommentPage";
import { ApplyAnswerPage } from "./qa/containers/ApplyAnswerPage";
import { useState } from "react";
import { ApplyQuestionPage } from "./qa/containers/ApplyQuestionPage";
import { OpenClassPage } from "./mentorbus/containers/OpenClassPage";
import { ClassInfoPage } from "./mentorbus/containers/ClassInfoPage";

export function MainRouter() {
  const [, setAnswer] = useState(""); // 상태 선언
  const position = localStorage.getItem("position"); // Retrieve position from localStorage

  return (
    <Routes>
      <Route path="/" element={<Onboarding />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/kakao" element={<Kakao />} />
      <Route path="/oauth" element={<KakaoRedirect />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/find" element={<FindMentor />} />
      <Route path="/find/:school" element={<FindMentor />} />
      <Route path="/qabus" element={<QAPage />} />
      <Route path="/mentorinfo" element={<MentorPage />} />
      <Route path="/mypage" element={<MyPage />} />

      <Route
        path={`/mentorbus`}
        element={
          position === "멘티" ? (
            <MentorBusPageMentee />
          ) : (
            <MentorBusPageMentor />
          )
        }
      />

      <Route
        path="/comment"
        element={<CommentPage Link={""} back_disable={""} back_work={"yes"} />}
      />
      <Route
        path="/comment/:index"
        element={<CommentPage Link={""} back_disable={""} back_work={"yes"} />}
      />
      <Route
        path="/applyanswer"
        element={
          <ApplyAnswerPage Link={""} back_disable={""} back_work={"yes"} />
        }
      />
      <Route
        path="/applyquestion"
        element={
          <ApplyQuestionPage
            setAnswer={setAnswer}
            Link={""}
            back_disable={""}
            back_work={"yes"}
          />
        }
      />

      <Route
        path="/openclass"
        element={
          <OpenClassPage Link={""} back_disable={""} back_work={"yes"} />
        }
      />

      <Route
        path="/openclass/modify"
        element={
          <OpenClassPage Link={""} back_disable={""} back_work={"yes"} />
        }
      />

      <Route path="/classinfo" element={<ClassInfoPage />} />
    </Routes>
  );
}
