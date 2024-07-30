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
    localStorage.setItem('position', position);  // Store the position in localStorage
    setCount(count + 1);
  };

  return (
    <div>
      <div className="absolute top-1/4 left-1/2 transform -translate-x-[70%] -translate-y-2/3 z-10 text-[#fff]">
        <div className="flex items-start mb-3 text-[12px]">{count}/5</div>
        <div className="flex items-start text-[26px] font-bold w-max items-baseline">
          <Logo width={"175"} height="auto" /> <div>에서</div>
        </div>
        <div className="flex items-start text-[26px] font-bold w-max">{sentence}</div>
      </div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-[50%] -translate-y-2/3 z-50">
        <button onClick={() => handleNext('멘티')}>
          <OnboardingButton title="멘티로 가입하기" explain="입시, 전공 관련 정보를 얻고 싶어요" />
        </button>

        <button onClick={() => handleNext('멘토')}>
          <OnboardingButton className="mt-[13px]" title="멘토로 가입하기" explain="입시, 전공 관련 경험을 나누고 싶어요" />
        </button>
      </div>
    </div>
  );
}
