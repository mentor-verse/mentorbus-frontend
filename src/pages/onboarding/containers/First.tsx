// src/components/First.js
import { NextButton } from "@/components/Icons/NextButton";
import { Logo } from "@/components/Icons/Logo";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { userNameAtom } from "@/atoms/userNameAtom";
import React from "react";
import { useNavigate } from "react-router-dom";

interface FirstProps {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  sentence: string;
}

interface FormData {
  name: string;
}

export function First({ count, setCount, sentence }: FirstProps) {
  const setUserName = useSetRecoilState(userNameAtom);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    setUserName(data.name);
    localStorage.setItem("userName", data.name);
    setCount(count + 1);
  };

  React.useEffect(() => {
    const position = localStorage.getItem("position");
    const userName = localStorage.getItem("userName");
    const userBelong = localStorage.getItem("userBelong");
    const major = localStorage.getItem("major");

    if (position && userName && userBelong && major) {
      navigate(`/mentorbus-frontend/main?userName=${userName}`);
    }
  }, [navigate]);

  return (
    <>
      <div className="relative z-10 text-[#fff] flex flex-col items-center mt-[25%]">
        <div className="w-[300px] flex items-start justify-start mb-3 text-[12px]">
          {count}/4
        </div>
        <div className="w-[300px] flex justify-start items-start text-start">
          <Logo width={"175"} height="auto" />
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
