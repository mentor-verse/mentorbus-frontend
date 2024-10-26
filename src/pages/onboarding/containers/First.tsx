import { NextButton } from "@/components/Icons/NextButton";
import { Logo, Logo2 } from "@/components/Icons/Logo";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { userNameAtom } from "@/atoms/userNameAtom";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Axios로 API 요청하기 위해 추가

interface FirstProps {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  sentence: string;
}

interface FormData {
  name: string;
}

interface MentorData {
  kakao_id: string;
  nickname: string;
}

export function First({ count, setCount, sentence }: FirstProps) {
  const setUserName = useSetRecoilState(userNameAtom);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted, isSubmitting },
  } = useForm<FormData>();

  // 서버에서 가져온 멘토 데이터를 저장할 state
  const [mentorData, setMentorData] = useState<MentorData | null>(null); // mentorData 타입 설정

  // 폼 제출 처리 함수
  const onSubmit = (data: FormData) => {
    setUserName(data.name);
    localStorage.setItem("userName", data.name);
    setCount(count + 1);
  };

  // 멘토 데이터를 가져오는 함수
  useEffect(() => {
    const kakao_id = localStorage.getItem("kakao_id");

    if (kakao_id) {
      // 백엔드 API 호출
      axios
        .get(
          `https://port-0-mentorbus-backend-m0zjsul0a4243974.sel4.cloudtype.app/onboarding/userdata/${kakao_id}`
        )
        .then((response) => {
          // 성공적으로 데이터를 가져왔을 때
          setMentorData(response.data);
          console.log("Mentor data:", response.data);
          const userName = response.data.nickname;
          navigate(`/mentorbus-frontend/main?userName=${userName}`);
        })
        .catch((error) => {
          console.error("Error fetching mentor data:", error);
        });
    }
  }, []); // []를 사용하여 컴포넌트가 처음 마운트될 때 한 번만 실행

  useEffect(() => {
    const kakaoId = localStorage.getItem("kakao_id");

    // mentorData가 존재하고 kakao_id가 일치하는지 확인
    if (mentorData && mentorData.kakao_id === kakaoId) {
      const userName = mentorData.nickname;
      navigate(`/mentorbus-frontend/main?userName=${userName}`);
    }
  }, [mentorData, navigate]); // mentorData가 업데이트될 때마다 확인

  return (
    <>
      <div className="relative z-10 text-[#fff] flex flex-col items-center mt-[25%]">
        <div className="w-[300px] flex items-start justify-start mb-3 text-[12px]">
          {count}/4
        </div>
        <div className="w-[300px] flex justify-start items-start text-start">
          <Logo2 width={"175"} height="auto" />
        </div>
        <div className="w-[300px] flex items-start mt-[13px] justify-start text-[26px] font-bold text-start">
          {sentence}
        </div>
      </div>
      <div
        className="relative flex justify-center mt-10 "
        style={{ top: "33%" }}
      >
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            className="w-[298px]"
            {...register("name", {
              required: "이름은 필수 입력입니다.",
            })}
            aria-invalid={
              isSubmitted ? (errors.name ? "true" : "false") : undefined
            }
          />
          {errors.name && (
            <small className="text-sm text-[#fff]">{errors.name.message}</small>
          )}

          <div className="flex justify-end mt-3">
            <button className="flex" type="submit" disabled={isSubmitting}>
              <NextButton />
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
