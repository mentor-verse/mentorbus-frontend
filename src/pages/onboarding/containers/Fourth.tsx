import { Logo } from "@/components/Icons/Logo";
import { OnboardingButton } from "@/components/ui/onboardingbutton";
import { useNavigate } from "react-router-dom";

interface FourthProps {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  sentence: string;
}

export function Fourth({ count, setCount, sentence }: FourthProps) {
  const navigate = useNavigate();

  const handleNext = (major: string) => {
    localStorage.setItem("major", major); // Store the major in localStorage
    navigate("/mentorbus-frontend/main");
  };

  const incrementCount = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <div className="relative flex flex-col items-center text-[#fff]">
      <div className="relative z-10 text-start mt-[25%]">
        <div className="flex items-start mb-3 text-[12px]">{count}/5</div>
        <div className="flex items-start text-[26px] font-bold w-max items-baseline justify-center">
          <Logo width={"175"} height="auto" /> <div>에서</div>
        </div>
        <div className="flex items-start text-[26px] font-bold w-max text-center">
          {sentence}
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
  );
}
