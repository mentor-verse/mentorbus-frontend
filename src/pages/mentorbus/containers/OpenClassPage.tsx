import { XIcon } from "@/components/Icons/PlusButton";
import { Button } from "@/components/ui/button";
import { cn } from "@/libs/utils";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { OpenClassSecond } from "./OpenClassSecond";
import { OpenClassThird } from "./OpenClassThird";
import { LeftArrow } from "@/components/Icons/LeftArrow";
import { usePostClassOpen } from "@/hooks/usePostClassOpen";

export interface OpenClassPageProps
  extends React.HTMLAttributes<HTMLDivElement> {
  Link: string;
  back_disable: string;
  back_work: string;
}

const OpenClassPage = React.forwardRef<HTMLDivElement, OpenClassPageProps>(
  ({ className, back_disable, back_work, Link }, ref) => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = React.useState("");
    const [title, setTitle] = React.useState("");
    const [viewState, setViewState] = React.useState<0 | 1 | 2>(0);
    const [secondPageFieldsEmpty, setSecondPageFieldsEmpty] =
      React.useState(true);
    const [thirdPageSelectionEmpty, setThirdPageSelectionEmpty] =
      React.useState(true);

    const [date, setDate] = React.useState("");
    const [maxPeople, setMaxPeople] = React.useState("");
    const [gatherUrl, setGatherUrl] = React.useState("");

    const areFieldsEmpty = () => {
      if (viewState === 0) {
        return title.trim() === "" || inputValue.trim() === "";
      } else if (viewState === 1) {
        return secondPageFieldsEmpty;
      } else if (viewState === 2) {
        return thirdPageSelectionEmpty;
      }
      return true;
    };

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

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setTitle(value);
    };

    const { mutateAsync: createClass } = usePostClassOpen();

    const handleBtnClick = async (
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _event: React.MouseEvent<HTMLButtonElement>
    ) => {
      console.log("Button clicked!");
      if (viewState === 2) {
        console.log("Final view state, attempting to navigate...");

        try {
          // Convert maxPeople to a number before passing it to createClass
          const parsedMaxPeople = Number(maxPeople);
          if (isNaN(parsedMaxPeople)) {
            alert(
              "Please enter a valid number for the maximum number of people."
            );
            return;
          }

          await createClass({
            userId: 1234,
            userName: "테스트",
            title: title,
            content: inputValue,
            date: date,
            memberCount: parsedMaxPeople,
            map: gatherUrl,
            job: "숭실대",
            major: "IT계열",
          });

          navigate(`/`);
        } catch (e) {
          console.error(e);
        }
      } else {
        // Move to the next state (0 -> 1 -> 2 -> 0)
        setViewState((prev) => ((prev + 1) % 3) as 0 | 1 | 2);
      }
    };

    return (
      <>
        <div className="main">
          <div className="main_content">
            <div style={{ background: "#fff" }}>
              {viewState === 0 && (
                <div
                  className={cn(
                    "flex items-center justify-center text-lg not-italic font-bold text-[19px] mt-[20px] ml-[140px]",
                    className
                  )}
                  ref={ref}
                >
                  <div className="text-[19px] text-[#333333] font-bold">
                    멘토링 개설
                  </div>
                  {!back_disable && (
                    <a className="ml-[140px]" onClick={handleBackClick}>
                      <XIcon />
                    </a>
                  )}
                </div>
              )}
              {(viewState === 1 || viewState === 2) && (
                <div
                  className={cn(
                    "flex items-center justify-between text-lg not-italic font-bold text-[19px] mt-[20px]",
                    className
                  )}
                  ref={ref}
                >
                  {!back_disable && (
                    <a className="ml-[20px]" onClick={handleBackClick}>
                      <LeftArrow />
                    </a>
                  )}
                  <div className="text-[19px] text-[#333333] font-bold">
                    멘토링 개설
                  </div>
                  {!back_disable && (
                    <a className="mr-[20px]" onClick={handleBackClick}>
                      <XIcon />
                    </a>
                  )}
                </div>
              )}
              {viewState === 0 && (
                <>
                  <input
                    className={cn(
                      "text-[20px] text-[#383838] font-semibold mt-[90px] flex justify-start ml-[33px] w-[80%] border-none focus:outline-none",
                      className
                    )}
                    placeholder="멘토링 제목"
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
                    onChange={handleInputChange}
                    value={inputValue}
                  ></textarea>
                </>
              )}
              {viewState === 1 && (
                <OpenClassSecond
                  Link={""}
                  back_disable={""}
                  back_work={""}
                  onFieldsStatusChange={setSecondPageFieldsEmpty}
                  onDateChange={setDate}
                  onMaxPeopleChange={setMaxPeople}
                />
              )}
              {viewState === 2 && (
                <OpenClassThird
                  Link={""}
                  back_disable={""}
                  back_work={""}
                  onSelectionStatusChange={setThirdPageSelectionEmpty}
                  onGatherUrlChange={setGatherUrl}
                />
              )}
              <div className="bottom_button">
                <Button
                  style={{
                    backgroundColor: areFieldsEmpty() ? "#BABABA" : undefined,
                    pointerEvents: areFieldsEmpty() ? "none" : "auto",
                    cursor: areFieldsEmpty() ? "not-allowed" : "pointer",
                  }}
                  disabled={areFieldsEmpty()}
                  onClick={handleBtnClick}
                >
                  다음
                </Button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
);

OpenClassPage.displayName = "OpenClassPage";

export { OpenClassPage };
