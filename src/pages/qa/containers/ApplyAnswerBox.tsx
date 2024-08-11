import * as React from "react";
import { cn } from "@/libs/utils.ts";
import { SmallWoman } from "@/components/Icons/SmallWoman";
import { SmallMan } from "@/components/Icons/SmallMan";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export interface ApplyAnswerBoxProps
  extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  gen: string;
}

const ApplyAnswerBox = React.forwardRef<HTMLDivElement, ApplyAnswerBoxProps>(
  ({ className, name, gen }) => {
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const idx = parseInt(queryParams.get("index") || "0", 10); // Convert idx to number, default to 0

    const handleClick = () => {
      // 이동할 때 userName을 포함하여 전달
      navigate("/mentorbus-frontend/applyanswer", {
        state: { userName: name, idx },
      });
    };

    return (
      <div
        className={cn(
          "grid place-items-center border-[#D5D5D5] border-[0.6px] rounded-[8px] w-[90%]",
          className
        )}
      >
        <div className="flex justify-between  items-center py-3">
          <div className="flex items-center text-start">
            <div className={gen}>
              {gen === "man" ? <SmallMan /> : <SmallWoman />}
            </div>
            <div className="ml-[10px]">
              <div className="text-xs not-italic text-[12px] text-[#4E98EE] font-medium">
                {name}멘토님의
              </div>
              <div className="not-italic font-semibold text-[12px] text-[#676767]">
                노하우를 공유해주세요
              </div>
            </div>
          </div>

          <div className="ml-[100px]"></div>

          <Button
            onClick={handleClick}
            className="w-[71px] h-[29px] bg-[#2F82E3] text-[12px] font-semibold"
          >
            답변하기
          </Button>
        </div>
      </div>
    );
  }
);

ApplyAnswerBox.displayName = "ApplyAnswerBox";

export { ApplyAnswerBox };
