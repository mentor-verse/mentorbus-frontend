import { Logo2 } from "@/components/Icons/Logo";
import { NextButton } from "@/components/Icons/NextButton";
import { OnboardingButton } from "@/components/ui/onboardingbutton";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface FifthProps {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  sentence: string;
}

export function Fifth({ count, sentence }: FifthProps) {
  const navigate = useNavigate();
  const [kakaoId, setKakaoId] = useState<string | null>(null); // kakaoId 상태값으로 설정

  const handleFavor = (favor: string) => {
    localStorage.setItem("favor", favor); // Store the major in localStorage
  };

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
    console.log("handleNext");
    const userName = localStorage.getItem("userName");
    console.log("userName:", userName);
    const position = localStorage.getItem("position");
    const userBelong = localStorage.getItem("userBelong");
    const major = localStorage.getItem("major");
    const favor = localStorage.getItem("favor");

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
          // navigate(`/mentorbus-frontend/main?userId=${kakaoId}`);
        })
        .catch((error) => {
          console.error("Error saving mentor data:", error);
        });
    } else if (position === "멘티") {
      // Mentee data를 POST
      const menteeData = {
        nickname: userName,
        position: position,
        school: userBelong,
        interest: major,
        want: favor,
        kakao_id: kakaoId,
      };

      console.log("menteeData:", menteeData);

      fetch(
        "https://port-0-mentorbus-backend-m0zjsul0a4243974.sel4.cloudtype.app/onboarding/mentee",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(menteeData),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("Mentee data saved:", data);
          navigate(`/main?userId=${kakaoId}`);
        })
        .catch((error) => {
          console.error("Error saving mentee data:", error);
        });
    }
  };

  return (
    <div className="relative flex flex-col items-center text-[#fff]">
      <div className="relative z-10 text-start mt-[25%]">
        <div className="w-[320px] justify-start flex items-start mb-3 text-[12px]">
          {count}/5
        </div>
        <div className="w-[320px] justify-start flex items-start text-[26px] font-bold ">
          <Logo2 width={"175"} height="auto" /> <div>에서</div>
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
          <button className="flex" type="submit" onClick={handleNext}>
            <NextButton />
          </button>
        </div>
      </div>
    </div>
  );
}
