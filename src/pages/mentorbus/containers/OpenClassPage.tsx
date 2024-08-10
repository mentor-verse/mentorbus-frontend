import { XIcon } from "@/components/Icons/PlusButton";
import { Button } from "@/components/ui/button";
import { cn } from "@/libs/utils";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { OpenClassSecond } from "./OpenClassSecond";
import { OpenClassThird } from "./OpenClassThird";

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
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setTitle(value);
    };

    const handleButtonClick = () => {
      if (viewState === 2) {
        console.log("Final view state, attempting to navigate...");

        try {
          // Validate and parse existing class data from localStorage
          const existingClassDataString =
            localStorage.getItem("ClassData") || "[]";
          let existingClassData: {
            id: number;
            title: string;
            content: string;
            date: string;
            maxPeople: string;
            gatherUrl: string;
          }[];

          try {
            existingClassData = JSON.parse(existingClassDataString);
            if (!Array.isArray(existingClassData)) {
              throw new Error("Parsed data is not an array");
            }
          } catch (error) {
            console.error("Error parsing ClassData from localStorage:", error);
            existingClassData = [];
          }

          // Create and update classData
          const classData = {
            id: Date.now(),
            title,
            content: inputValue,
            date,
            maxPeople,
            gatherUrl,
          };

          const updatedClassData = [...existingClassData, classData];
          localStorage.setItem("ClassData", JSON.stringify(updatedClassData));

          // Update appliedItems
          const newSelectedBox: SelectedBox = {
            gen: "",
            major: "",
            name: title,
            info: inputValue,
            date: date,
            sort: gatherUrl,
            status: "pending",
          };

          const existingAppliedItemsString =
            localStorage.getItem("appliedItems") || "[]";
          let existingAppliedItems: SelectedBox[];

          try {
            existingAppliedItems = JSON.parse(existingAppliedItemsString);
            if (!Array.isArray(existingAppliedItems)) {
              throw new Error("Parsed data is not an array");
            }
          } catch (error) {
            console.error(
              "Error parsing appliedItems from localStorage:",
              error
            );
            existingAppliedItems = [];
          }

          const updatedAppliedItems = [...existingAppliedItems, newSelectedBox];
          localStorage.setItem(
            "appliedItems",
            JSON.stringify(updatedAppliedItems)
          );

          // Navigate
          navigate("/mentorbus-frontend/mentorbus");
        } catch (error) {
          console.error("Error saving data or navigating:", error);
        }
      } else {
        console.log("Incrementing view state...");
        setViewState((prev) => (prev + 1) % 3);
      }
    };

    return (
      <>
        <div className="main">
          <div className="main_content">
            <div style={{ background: "#fff" }}>
              {(viewState === 0 || viewState === 1) && (
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
                      <XIcon />
                    </a>
                  )}
                  <div className="text-[19px] text-[#333333] font-bold">
                    멘토링 개설
                  </div>
                  <div className="text-[16px] text-[#333333] font-medium mr-[20px] cursor-pointer">
                    작성
                  </div>
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
                      "text-[13px] text-[#383838] font-normal mt-[20px] flex justify-start ml-[33px] w-[80%] border-none focus:outline-none h-[50vh]",
                      className
                    )}
                    placeholder="내용을 입력하세요"
                    rows={4}
                    style={{ resize: "none" }}
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
                  onClick={handleButtonClick}
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
