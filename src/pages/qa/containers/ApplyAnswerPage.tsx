import * as React from "react";
import { cn } from "../../../libs/utils.ts";
import { useLocation, useNavigate } from "react-router-dom";
import { XIcon } from "@/components/Icons/PlusButton.tsx";
import { usePostAnswer } from "@/hooks/usePostAnswer.ts";

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
    const [questionId, setQuestionId] = React.useState<string | null>(null); // kakaoId 상태값으로 설정

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

      event.target.style.height = "auto";
      event.target.style.height = `${event.target.scrollHeight}px`;
    };

    React.useEffect(() => {
      const searchParams = new URLSearchParams(location.search);
      const urlLetterId = searchParams.get("questionId");

      if (urlLetterId) {
        setQuestionId(urlLetterId);
        localStorage.setItem("questionId", urlLetterId);
      } else {
        const storedLetterId = localStorage.getItem("questionId");
        if (storedLetterId) {
          setQuestionId(storedLetterId);
        }
      }
    }, [location.search]);

    const { mutateAsync: createAnswer } = usePostAnswer();

    const handleApplyClick = async () => {
      console.log("Button clicked!");
      try {
        await createAnswer({
          userId: 1234,
          content: inputValue,
          questionId: questionId,
        });

        navigate(`/comment&letter_id==${questionId}`);
      } catch (e) {
        console.error(e);
      }
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
                  onClick={handleApplyClick}
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
