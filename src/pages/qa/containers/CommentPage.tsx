import * as React from "react";
import { cn } from "../../../libs/utils.ts";
import { CommentQuestionSection } from "./CommentQuestionSection.tsx";
import { CommentSection } from "./CommentSection.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import { LeftArrow } from "@/components/Icons/LeftArrow.tsx";
import BottomNav from "@/containers/navbar.tsx";
import { ApplyAnswerBox } from "@/pages/qa/containers/ApplyAnswerBox.tsx";

export interface CommentPageProps extends React.HTMLAttributes<HTMLDivElement> {
  Link: string;
  back_disable: string;
  back_work: string;
}

const CommentPage = React.forwardRef<HTMLDivElement, CommentPageProps>(
  ({ className, back_disable, back_work, Link }, ref) => {
    const navigate = useNavigate();
    const location = useLocation();

    // Extract userName from the query parameters
    const queryParams = new URLSearchParams(location.search);
    const userName = queryParams.get("userName");

    // QAPage로부터 전달받은 state에서 데이터 추출
    const { answer, question, star_num, comment_num } = location.state || {};

    // Get the questions data from localStorage
    const questions = localStorage.getItem("questions");
    let mentor_answer = null;

    if (questions) {
      const questionsData = JSON.parse(questions);

      // Iterate over the questionsData array to find the question matching the userName and question
      for (const questionData of questionsData) {
        if (
          questionData.userName === userName &&
          questionData.question === question
        ) {
          mentor_answer = questionData.mentor_answer;
          break;
        }
      }
    }

    // Get the position from localStorage
    const position = localStorage.getItem("position");

    const handleBackClick = () => {
      if (back_work === "no") {
        return;
      }

      if (Link) {
        navigate(Link);
      } else {
        const currentPath = location.pathname;

        if (
          currentPath === "/Onboarding/Phone" ||
          currentPath === "/Onboarding/Submit" ||
          currentPath === "/Onboarding/Underage"
        ) {
          // Handle back navigation if needed
        } else {
          window.history.back();
        }
      }
    };

    return (
      <div className={cn("grid place-items-center", className)} ref={ref}>
        <div className="flex items-center justify-center text-lg not-italic font-bold text-[19px] mt-[20px] mr-[140px]">
          {!back_disable && (
            <a onClick={handleBackClick}>
              <LeftArrow />
            </a>
          )}
          <div className="ml-[140px]"></div>
          <div>멘토버스</div>
        </div>

        <div className="flex text-start justify-start items-start w-[90%]">
          <CommentQuestionSection
            answer={answer || "기본 답변"}
            question={question || "기본 질문"}
            star_num={star_num || 0}
            comment_num={comment_num || 0}
          />
        </div>

        <div className="mt-[40px]"></div>

        {/* Conditional rendering */}
        {mentor_answer ? (
          <CommentSection
            mentor_answer={mentor_answer}
            star_num={0}
            comment_num={0}
          />
        ) : (
          position === "멘토" && (
            <ApplyAnswerBox name={userName || "기본명"} gen={"woman"} />
          )
        )}

        <BottomNav />
      </div>
    );
  }
);

CommentPage.displayName = "CommentPage";

export { CommentPage };
