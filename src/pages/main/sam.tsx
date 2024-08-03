// src/components/Onboarding.js
import { useRecoilValue } from "recoil";
import { isLoggedInAtom } from "@/atoms/isLoggedInAtom";

import { useState, useEffect } from "react";
import { Road } from "@/components/Icons/Road";
import { Logo } from "@/components/Icons/Logo";
import { OnboardingButton } from "@/components/ui/onboardingbutton";

export function Sam() {
  const isLoggedIn = useRecoilValue(isLoggedInAtom);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isLoggedIn || localStorage.getItem("kakaoToken")) {
      setCount(1);
    } else {
      setCount(0);
    }
  }, [isLoggedIn]);

  return (
    <div className="main flex flex-col min-h-screen">
      <div className="main_content flex-1">
        <div className="relative flex flex-col items-center text-[#fff]">
          <div className="relative flex flex-col items-center text-[#fff]">
            <div className="relative z-10 text-center mt-[25%]">
              <div className="flex items-start mb-3 text-[12px]">{count}/5</div>
              <div className="flex items-start text-[26px] font-bold w-max items-baseline justify-center">
                <Logo width={"175"} height="auto" /> <div>에서</div>
              </div>
              <div className="flex items-start text-[26px] font-bold w-max text-center">
                안녕하세요
              </div>
            </div>

            <div className="relative flex flex-col items-center mt-10">
              <div className="flex">
                <button
                  onClick={() => {
                    handleNext("인문계열");
                    incrementCount();
                  }}
                >
                  <OnboardingButton
                    className="w-[160px]"
                    title="인문계열"
                    explain={""}
                  />
                </button>

                <button
                  onClick={() => {
                    handleNext("사회계열");
                    incrementCount();
                  }}
                >
                  <OnboardingButton
                    className="w-[160px] ml-[12px]"
                    title="사회계열"
                    explain={""}
                  />
                </button>
              </div>

              <div className="mt-[11px]">
                <button
                  onClick={() => {
                    handleNext("자연계열");
                    incrementCount();
                  }}
                >
                  <OnboardingButton
                    className="w-[160px]"
                    title="자연계열"
                    explain={""}
                  />
                </button>

                <button
                  onClick={() => {
                    handleNext("공학계열");
                    incrementCount();
                  }}
                >
                  <OnboardingButton
                    className="w-[160px] ml-[12px]"
                    title="공학계열"
                    explain={""}
                  />
                </button>
              </div>

              <div className="mt-[11px]">
                <button
                  onClick={() => {
                    handleNext("의학계열");
                    incrementCount();
                  }}
                >
                  <OnboardingButton
                    className="w-[160px]"
                    title="의학계열"
                    explain={""}
                  />
                </button>

                <button
                  onClick={() => {
                    handleNext("교육계열");
                    incrementCount();
                  }}
                >
                  <OnboardingButton
                    className="w-[160px] ml-[12px]"
                    title="교육계열"
                    explain={""}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {count !== 0 && (
        <div className="flex-none">
          <div className="grid place-items-center w-full">
            <Road />
          </div>
        </div>
      )}
    </div>
  );
}
