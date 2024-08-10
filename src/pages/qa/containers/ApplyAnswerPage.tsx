import * as React from "react";
import { cn } from "../../../libs/utils.ts";
import { useLocation, useNavigate } from "react-router-dom";
import { XIcon } from "@/components/Icons/PlusButton.tsx";

export interface ApplyAnswerPageProps
  extends React.HTMLAttributes<HTMLDivElement> {
  Link: string;
  back_disable: string;
  back_work: string;
}

const ApplyAnswerPage = React.forwardRef<HTMLDivElement, ApplyAnswerPageProps>(
  ({ className, back_disable, back_work, Link }, ref) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [inputValue, setInputValue] = React.useState("");

    const userName = location.state?.userName || "기본명";

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

    const handleInputChange = (
      event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      const value = event.target.value;
      setInputValue(value);
    };

    const handleSaveAndNavigate = () => {
      const storedData = JSON.parse(localStorage.getItem("questions") || "[]");

      // Find the specific question and its corresponding answer
      const questionData = storedData.find(
        (question: any) => question.question
      );

      if (!questionData) {
        // Handle case where no question is found, possibly with an error or default value
        console.error("No question found in localStorage");
        return;
      }

      const updatedData = storedData.map((question: any) => {
        if (question.question) {
          return {
            ...question,
            mentor_answer: inputValue, // Update the mentor_answer field
          };
        }
        return question;
      });

      localStorage.setItem("questions", JSON.stringify(updatedData));

      navigate(
        `/mentorbus-frontend/comment?userName=${encodeURIComponent(
          userName
        )}&userQuestion=${encodeURIComponent(questionData.question)}`
      );
    };

    return (
      <>
        <div className="main">
          <div className="main_content">
            <div style={{ background: "#fff" }}>
              <div
                className={cn(
                  "flex items-center justify-between text-lg not-italic font-bold text-[19px] mt-[20px]",
                  className
                )}
                ref={ref}
              >
                {!back_disable && (
                  <a className="ml-[20px]" onClick={handleBackClick}>
                    <XIcon />
                  </a>
                )}
                <div className="text-[19px] text-[#333333] font-bold">
                  답변등록
                </div>
                <div
                  className="text-[16px] text-[#333333] font-medium mr-[20px] cursor-pointer"
                  onClick={handleSaveAndNavigate}
                >
                  작성
                </div>
              </div>
              <textarea
                className={cn(
                  "text-[13px] text-[#383838] font-normal mt-[90px] flex justify-start ml-[33px] w-[80%] border-none focus:outline-none h-[50vh]",
                  className
                )}
                placeholder="답변을 등록하세요"
                rows={4}
                style={{ resize: "none" }}
                onChange={handleInputChange}
              ></textarea>
              <div className="grid place-items-center">
                <div className="text-[12px] font-normal text-[#8E9398] w-[80%] text-start">
                  {inputValue && (
                    <p>
                      깨끗한 커뮤니티를 위해 편파적인 발언 및 욕설 비하는
                      자제해주세요. 해당 사항을 어길 시 활동이 제한될 수
                      있습니다
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
);

ApplyAnswerPage.displayName = "ApplyAnswerPage";

export { ApplyAnswerPage };
