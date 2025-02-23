import { Logo } from "@/components/Icons/Logo";
import { OnboardingButton } from "@/components/ui/onboardingbutton";
import { usePostOnboarding } from "@/hooks/usePostOnboarding";
import { useNavigate } from "react-router-dom";

interface FourthProps {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  sentence: string;
}

export function Fourth({ count, setCount, sentence }: FourthProps) {
  const navigate = useNavigate();

  const { mutateAsync: createPost } = usePostOnboarding();

  const isMentor = localStorage.getItem("isMentor") === "true";

  const handleNext = async (selectedField: string) => {
    if (isMentor) {
      try {
        if (selectedField === "") {
          alert("전공을 선택해주세요.");
          return;
        }

        const storedUserId = Number(localStorage.getItem("userId"));

        const userName = localStorage.getItem("userName") || "";
        const isMentor = localStorage.getItem("isMentor") === "true";
        const job = localStorage.getItem("job") || "";
        const school = localStorage.getItem("school") || "";
        const major = localStorage.getItem("major") || "";

        const payload = {
          userId: storedUserId,
          userName,
          isMentor,
          job,
          school,
          ...(isMentor
            ? { maor: major } // 멘토면 major만 포함
            : { major: selectedField }), // 멘티면 interest만 포함
        };

        await createPost(payload);
        navigate(`/main`);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const incrementCount = (selectedField: string) => {
    localStorage.setItem("major", selectedField);
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <div className="relative flex flex-col items-center text-[#fff]">
      <div className="relative z-10 text-start mt-[25%]">
        <div className="w-[320px] flex items-start mb-3 text-[12px]">
          {count}/4
        </div>
        <div className="w-[320px] flex items-start text-[26px] font-bold">
          <Logo width={"175"} height="auto" /> <div>에서</div>
        </div>
        <div className="w-[320px] flex items-start text-[26px] font-bold text-center">
          {sentence}
        </div>
      </div>

      <div className="relative flex flex-col items-center mt-10">
        <div className="flex">
          <button
            onClick={() => {
              handleNext("인문계열");
              incrementCount("인문계열");
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
              incrementCount("사회계열");
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
              incrementCount("자연계열");
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
              incrementCount("공학계열");
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
              incrementCount("의학계열");
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
              incrementCount("교육계열");
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
