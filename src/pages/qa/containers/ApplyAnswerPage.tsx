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

    // Get the index and userName from the state
    const idx = location.state?.idx;

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

    const handleInputChange = (
      event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      const value = event.target.value;
      setInputValue(value);

      event.target.style.height = "auto"; // Reset height to auto to calculate correct scrollHeight
      event.target.style.height = `${event.target.scrollHeight}px`; // Set height to the scrollHeight of the content
    };

    const handleSaveAndNavigate = () => {
      const storedData = JSON.parse(localStorage.getItem("questions") || "[]");

      // Ensure that the index is within the array bounds
      if (idx !== undefined && idx !== null && storedData[idx]) {
        storedData[idx].mentor_answer = inputValue; // Update the mentor_answer field
      } else {
        console.error("Invalid index or no question found in localStorage");
        return;
      }

      localStorage.setItem("questions", JSON.stringify(storedData));

      // Navigate back to the question/comment page after saving
      navigate(`/mentorbus-frontend/qabus`);
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
                  "text-[13px] text-[#383838] font-normal mt-[90px] flex justify-start ml-[33px] w-[80%] border-none focus:outline-none resize-none min-h-[50px] max-h-[500px] overflow-y-auto",
                  className
                )}
                placeholder="내용을 입력하세요"
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
