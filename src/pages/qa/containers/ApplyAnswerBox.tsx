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
    const [letter_id, setLetterId] = React.useState<string | null>(null);
    const queryParams = new URLSearchParams(window.location.search);
    const idx = parseInt(queryParams.get("index") || "0", 10); // Convert idx to number, default to 0

    // URL에서 letter_id를 가져오는 함수
    React.useEffect(() => {
      const searchParams = new URLSearchParams(window.location.search);
      console.log("window.location.search:", window.location.search); // Log full search string for debugging

      const urlLetterId = searchParams.get("letter_id"); // Get the letter_id parameter
      console.log("Extracted letter_id:", urlLetterId); // Log to see the extracted letter_id

      if (urlLetterId) {
        setLetterId(urlLetterId); // 상태 업데이트
      } else {
        console.error("letter_id not found in the URL");
      }
    }, []);

    const handleClick = () => {
      if (letter_id) {
        // 이동할 때 letter_id와 userName을 포함하여 전달
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
