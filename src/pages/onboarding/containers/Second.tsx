import { Logo } from "@/components/Icons/Logo";
import { OnboardingButton } from "@/components/ui/onboardingbutton";
import React from "react";

interface SecondProps {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  sentence: string;
}

export function Second({ count, setCount, sentence }: SecondProps) {
  const handleNext = (position: string) => {
    localStorage.setItem("position", position); // 선택한 역할 저장

    if (position === "멘토") {
      localStorage.setItem("isMentor", "true"); // 멘토일 경우 true 저장
    } else {
      localStorage.removeItem("isMentor"); // 멘티일 경우 isMentor 삭제 (false처럼 동작)
    }

    setCount(count + 1);
  };

  return (
    <div className="relative flex flex-col items-center text-[#fff]">
      <div className="relative z-10 text-start mt-[25%]">
        <div className="w-[320px] justify-start flex items-start mb-3 text-[12px]">
          {count}/4
        </div>
        <div className="w-[320px] justify-start flex items-start text-[26px] font-bold ">
          <Logo width={"175"} height="auto" /> <div>에서</div>
        </div>
        <div className="w-[320px] justify-start flex items-start text-[26px] font-bold">
          {sentence}
        </div>
      </div>

      <div
        className="relative flex flex-col items-center z-50 mt-10"
        style={{ top: "50%" }}
      >
        <button onClick={() => handleNext("멘티")}>
          <OnboardingButton
            title="멘티로 가입하기"
            explain="입시, 전공 관련 정보를 얻고 싶어요"
          />
        </button>

        <button onClick={() => handleNext("멘토")}>
          <OnboardingButton
            className="mt-[13px]"
            title="멘토로 가입하기"
            explain="입시, 전공 관련 경험을 나누고 싶어요"
          />
        </button>
      </div>
    </div>
  );
}
