import { Logo } from "@/components/Icons/Logo";
import { OnboardingButton } from "@/components/ui/onboardingbutton";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface FourthProps {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  sentence: string;
}

export function Fourth({ count, setCount, sentence }: FourthProps) {
  const navigate = useNavigate();
  const [kakaoId, setKakaoId] = useState<string | null>(null); // kakaoId 상태값으로 설정

  // URL에서 kakaoId를 가져오는 함수
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const urlKakaoId = searchParams.get("userId"); // URL에서 userId 파라미터로 kakaoId 추출
    if (urlKakaoId) {
      setKakaoId(urlKakaoId); // 상태 업데이트
      localStorage.setItem("kakao_id", urlKakaoId); // localStorage에 저장
    } else {
      const storedKakaoId = localStorage.getItem("kakao_id");
      if (storedKakaoId) {
        setKakaoId(storedKakaoId);
      }
    }
  }, [location.search]);

  const handleNext = () => {
    localStorage.setItem("major", major); // Store the major in localStorage
    const position = localStorage.getItem("position");
    const userName = localStorage.getItem("userName");
    console.log("userName:", userName);
    const userBelong = localStorage.getItem("userBelong");
    const major = localStorage.getItem("major");

    if (position === "멘토") {
      // Mentor data를 POST
      const mentorData = {
        nickname: userName,
        position: position,
        job: userBelong,
        major: major,
        kakao_id: kakaoId,
      };

      console.log("mentorData:", mentorData);

      fetch(
        "https://port-0-mentorbus-backend-m0zjsul0a4243974.sel4.cloudtype.app/onboarding/mentor",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(mentorData),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("User data saved:", data);
          navigate(`/mentorbus-frontend/main?userId=${kakaoId}`);
        })
        .catch((error) => {
          console.error("Error saving mentor data:", error);
        });
    }
  };

  const incrementCount = () => {
    setCount((prevCount) => prevCount + 1);
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
        <div className="w-[320px] justify-start flex items-start text-[26px] font-bold text-center">
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
