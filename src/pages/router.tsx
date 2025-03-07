import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import LoginPage from "./login/page";
import { MainPage } from "./main/page";
import KakaoLoginRedirect from "./login/auth/kakao";
import RegisterPage from "./register/page";
import { FindMentor } from "./findmentor/page";
import { QAPage } from "./qa/page";
import { MentorBusPageMentee, MentorBusPageMentor } from "./mentorbus/page";
import { CommentPage } from "./qa/containers/CommentPage";
import { MentorApplyPage } from "./findmentor/containers/MentorApplyPage";
import { MyPage } from "./mypage/page";

export function MainRouter() {
  // const [, setAnswer] = useState(""); // 상태 선언
  const position = localStorage.getItem("position"); // Retrieve position from localStorage

  const location = useLocation();
  const navigate = useNavigate();

  const [didMount, setDidMount] = useState(false);

  useEffect(() => {
    setDidMount(true);
  }, []);

  useEffect(() => {
    if (!didMount) return;

    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user === null) {
        if (
          !["/login", "/register", "/auth/kakao/callback"].includes(
            location.pathname
          )
        ) {
          alert("로그인이 필요한 페이지입니다.");
          console.log(333);
          navigate("/login");
        }
      }
    });
  }, [didMount]);

  return (
    <Routes>
      <Route path="*" element={<div>404 Not Found</div>} />
      <Route path="/">
        <Route path="" element={<MainPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="auth/kakao/callback" element={<KakaoLoginRedirect />} />
        <Route path="/find" element={<FindMentor />} />
        <Route path="/qabus" element={<QAPage />} />
        <Route path="/mentorinfo" element={<MentorApplyPage />} />
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
          element={
            <CommentPage Link={""} back_disable={""} back_work={"yes"} />
          }
        />
      </Route>
      {/*
      <Route path="/find/:school" element={<FindMentor />} />
      <Route path="/" element>
        <Route path="/onboarding"></Route>
      </Route>


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

      <Route path="/classinfo" element={<ClassInfoPage />} /> */}
    </Routes>
  );
}
