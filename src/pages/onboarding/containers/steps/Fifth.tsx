import { Logo } from "@/components/Icons/Logo";
import { NextButton } from "@/components/Icons/NextButton";
import { OnboardingButton } from "@/components/ui/onboardingbutton";
import { usePostOnboarding } from "@/hooks/usePostOnboarding";
import {
  LOGIN_SUCCESS,
  UserActionTypes,
  UserData,
} from "@/types/login/UserType";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

interface FifthProps {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  sentence: string;
}

const loginSuccess = (userData: UserData): UserActionTypes => ({
  type: LOGIN_SUCCESS,
  payload: userData,
});

export function Fifth({ count, sentence }: FifthProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mutateAsync: createPost } = usePostOnboarding();

  const handleFavor = (favor: string) => {
    localStorage.setItem("favor", favor);
  };

  const handleNext = async () => {
    try {
      const selectedField = localStorage.getItem("favor") || "";
      if (selectedField === "") {
        alert("관심사를 선택해주세요.");
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
      const major = localStorage.getItem("major") || "";

      const payload = {
        userId: storedUserId,
        userName,
        isMentor,
        job,
        school,
        major,
        ...(isMentor ? { interest: null } : { interest: selectedField }),
      };

      await createPost(payload);
      dispatch(loginSuccess(payload));
      navigate(`/main`);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="relative flex flex-col items-center text-[#fff]">
      <div className="relative z-10 text-start mt-[25%]">
        <div className="w-[320px] justify-start flex items-start mb-3 text-[12px]">
          {count}/5
        </div>
        <div className="w-[320px] justify-start flex items-start text-[26px] font-bold ">
          <Logo width={"175"} height="auto" /> <div>에서</div>
        </div>
        <div className="w-[320px] justify-start flex items-start text-[26px] font-bold text-center">
          {sentence}
        </div>
      </div>

      <div className="relative flex flex-col items-center mt-10">
        <div className="flex">
          <button
            onClick={() => {
              handleFavor("입시전략");
            }}
          >
            <OnboardingButton
              className="w-[160px]"
              title="입시전략"
              explain={""}
            />
          </button>

          <button
            onClick={() => {
              handleFavor("전공탐색");
            }}
          >
            <OnboardingButton
              className="w-[160px] ml-[12px]"
              title="전공탐색"
              explain={""}
            />
          </button>
        </div>

        <div className="mt-[11px]">
          <button
            onClick={() => {
              handleFavor("진로고민");
            }}
          >
            <OnboardingButton
              className="w-[160px]"
              title="진로고민"
              explain={""}
            />
          </button>

          <button
            onClick={() => {
              handleFavor("자기계발");
            }}
          >
            <OnboardingButton
              className="w-[160px] ml-[12px]"
              title="자기계발"
              explain={""}
            />
          </button>
        </div>
        <div className="flex w-full justify-end mt-3">
          <button type="button" onClick={handleNext}>
            <NextButton />
          </button>
        </div>
      </div>
    </div>
  );
}
