import * as React from "react";
import { cn } from "../../../libs/utils.ts";
import { useLocation, useNavigate } from "react-router-dom";
import { XIcon } from "@/components/Icons/PlusButton.tsx";

export interface ApplyQuestionPageProps
  extends React.HTMLAttributes<HTMLDivElement> {
  Link: string;
  back_disable: string;
  back_work: string;
  setAnswer: (answer: string) => void;
}

const ApplyQuestionPage = React.forwardRef<
  HTMLDivElement,
  ApplyQuestionPageProps
>(({ className, back_disable, back_work, Link, setAnswer }, ref) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [inputValue, setInputValue] = React.useState("");
  const [title, setTitle] = React.useState("");

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
        // 뒤로 가기 불가능 알림 등의 작업 수행
      } else {
        window.history.back();
      }
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setInputValue(value);

    event.target.style.height = "auto"; // Reset height to auto to calculate correct scrollHeight
    event.target.style.height = `${event.target.scrollHeight}px`; // Set height to the scrollHeight of the content
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setTitle(value);
  };

  const handleSaveAndNavigate = () => {
    const storedData = JSON.parse(localStorage.getItem("questions") || "[]");
    const newQuestion = {
      question: title,
      answer: inputValue,
      star_num: 0,
      comment_num: 0,
      type: "all",
      major: localStorage.getItem("major") || "공학계열",
      mentor_answer: "",
      userName: localStorage.getItem("userName") || "기본명",
    };

    storedData.push(newQuestion);
    localStorage.setItem("questions", JSON.stringify(storedData));
    setAnswer(inputValue);
    navigate("/mentorbus-frontend/qabus");
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
              <div className="text-[19px] text-[#333333] font-bold">글쓰기</div>
              <div
                className="text-[16px] text-[#333333] font-medium mr-[20px] cursor-pointer"
                onClick={handleSaveAndNavigate}
              >
                작성
              </div>
            </div>
            <input
              className={cn(
                "text-[20px] text-[#383838] font-semibold mt-[90px] flex justify-start ml-[33px] w-[80%] border-none focus:outline-none",
                className
              )}
              placeholder="제목"
              value={title}
              onChange={handleTitleChange}
            />
            <textarea
              className={cn(
                "text-[13px] text-[#383838] font-normal mt-[20px] flex justify-start ml-[33px] w-[80%] border-none focus:outline-none resize-none min-h-[50px] max-h-[500px] overflow-y-auto",
                className
              )}
              placeholder="내용을 입력하세요"
              rows={4}
              style={{ resize: "none" }}
              onChange={handleInputChange}
              value={inputValue}
            ></textarea>
            <div className="grid place-items-center">
              <div className="text-[12px] font-normal text-[#8E9398] w-[80%] text-start">
                {inputValue && (
                  <p>
                    깨끗한 커뮤니티를 위해 편파적인 발언 및 욕설 비하는
                    자제해주세요. 해당 사항을 어길 시 활동이 제한될 수 있습니다
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

ApplyQuestionPage.displayName = "ApplyQuestionPage";

export { ApplyQuestionPage };
