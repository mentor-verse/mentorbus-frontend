import * as React from "react";
import { cn } from "@/libs/utils.ts";
import { SmallWoman } from "@/components/Icons/SmallWoman";
import { SmallMan } from "@/components/Icons/SmallMan";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export interface ApplyAnswerBoxProps
  extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  gen: string;
}

const ApplyAnswerBox = React.forwardRef<HTMLDivElement, ApplyAnswerBoxProps>(
  ({ className, name, gen }) => {
    const navigate = useNavigate();
    const [letter_id, setLetterId] = useState<string | null>(null);
    const queryParams = new URLSearchParams(window.location.search);
    const idx = parseInt(queryParams.get("index") || "0", 10);

    useEffect(() => {
      const searchParams = new URLSearchParams(window.location.search);
      console.log("window.location.search:", window.location.search);

      const urlLetterId = searchParams.get("letter_id");
      console.log("Extracted letter_id:", urlLetterId);

      if (urlLetterId) {
        setLetterId(urlLetterId);
      } else {
        console.error("letter_id not found in the URL");
      }
    }, []);

    const handleClick = () => {
      if (letter_id) {
        navigate(`/applyanswer?letter_id=${letter_id}`, {
          state: { userName: name, idx },
        });
      } else {
        console.error("letter_id is null, cannot navigate");
      }
    };

    return (
      <div
        className={cn(
          "grid place-items-center border-[#D5D5D5] border-[0.6px] rounded-[8px] w-[85%]",
          className
        )}
      >
        <div className="flex justify-between w-full items-center py-3">
          <div className="flex items-center text-start">
            <div className={gen} style={{ marginLeft: "19px" }}>
              {gen === "man" ? <SmallMan /> : <SmallWoman />}
            </div>
            <div className="ml-[10px] w-[90%]">
              <div className="text-xs not-italic text-[12px] text-[#4E98EE] font-medium">
                {name}멘토님의
              </div>
              <div className="not-italic font-semibold text-[12px] text-[#676767]">
                노하우를 공유해주세요
              </div>
            </div>
          </div>

          <Button
            onClick={handleClick}
            className="ml-auto w-[71px] h-[29px] bg-[#2F82E3] text-[12px] font-semibold mr-[19px]"
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
