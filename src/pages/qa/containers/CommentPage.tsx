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

    // Extract userName and idx from the query parameters or state
    const queryParams = new URLSearchParams(location.search);
    const userName = queryParams.get("userName") || "기본명"; // Default value if userName is null
    const idx = parseInt(queryParams.get("index") || "0", 10); // Convert idx to number, default to 0

    // QAPage로부터 전달받은 state에서 데이터 추출
    const { answer, question, star_num, comment_num } = location.state || {};

    // Get the questions data from localStorage
    const questions = localStorage.getItem("questions");
    let mentor_answer = null;

    if (questions) {
      const questionsData = JSON.parse(questions);

      // 해당 인덱스의 question 및 mentor_answer 가져오기
      if (idx >= 0 && idx < questionsData.length) {
        mentor_answer = questionsData[idx].mentor_answer;
      } else {
        console.error("Invalid index or question data not found.");
      }
    }

    // Get the user's position from localStorage
    const position = localStorage.getItem("position");

    const handleBackClick = () => {
      if (back_work === "no") {
        return;
      }

      if (Link) {
        navigate(Link);
      } else {
        window.history.back();
      }
    };

    return (
      <div className={cn("grid place-items-center", className)} ref={ref}>
        <div className="flex items-center justify-between w-full text-lg not-italic font-bold text-[19px] mt-[20px]">
          {!back_disable && (
            <a className="ml-[20px]" onClick={handleBackClick}>
              <LeftArrow />
            </a>
          )}
          <div className="text-lg not-italic font-bold text-[19px] mr-[5px]">
            고민버스
          </div>
          <div className="text-[16px] text-[#333333] font-medium mr-[20px] cursor-pointer"></div>
        </div>

        <div className="flex text-start justify-start items-start w-[90%] mt-[20px]">
          <CommentQuestionSection
            answer={answer || "기본 답변"}
            question={question || "기본 질문"}
            star_num={star_num || 0}
            comment_num={comment_num || 0}
          />
        </div>

        {/* Conditional rendering */}
        {mentor_answer ? (
          <CommentSection
            mentor_answer={mentor_answer}
            star_num={0}
            comment_num={0}
          />
        ) : (
          position !== "멘티" && (
            <>
              <div className="mt-[25px]"></div>
              <ApplyAnswerBox name={userName} gen={"woman"} />
            </>
          )
        )}

        <BottomNav />
      </div>
    );
  }
);

CommentPage.displayName = "CommentPage";

export { CommentPage };
