import { Logo } from "@/components/Icons/Logo";
import { OnboardingButton } from "@/components/ui/onboardingbutton";
import { usePostOnboarding } from "@/hooks/usePostOnboarding";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface FourthProps {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  sentence: string;
}

export function Fourth({ count, setCount, sentence }: FourthProps) {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);

  const { mutateAsync: createPost } = usePostOnboarding();

  // URL에서 userId를 가져와 상태 및 localStorage에 저장
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const urlUserId = searchParams.get("userId");
    if (urlUserId) {
      setUserId(urlUserId);
      localStorage.setItem("userId", urlUserId); // urlUserId를 사용합니다.
    } else {
      const storedUserId = localStorage.getItem("userId");
      if (storedUserId) {
        setUserId(storedUserId);
      }
    }
  }, [location.search]);

  const handleNext = async (selectedField: string) => {
    try {
      if (selectedField === "") {
        alert("전공을 선택해주세요.");
        return;
      }

      const storedUserId = Number(localStorage.getItem("userId"));
      if (isNaN(storedUserId)) {
        console.error("userId가 숫자가 아닙니다.");
        return;
      }

      const userName = localStorage.getItem("userName") || "";
      const isMentor = localStorage.getItem("isMentor") === "true";
      const job = localStorage.getItem("job") || "";
      const school = localStorage.getItem("school") || "";

      // 조건에 따라 payload 객체에 해당 속성만 포함시킵니다.
      const payload = {
        userId: storedUserId,
        userName,
        isMentor,
        job,
        school,
        ...(isMentor
          ? { major: selectedField } // 멘토면 major만 포함
          : { interest: selectedField }), // 멘티면 interest만 포함
      };

      await createPost(payload);
      navigate(`/`);
    } catch (e) {
      console.error(e);
    }
  };

  const incrementCount = () => {
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
