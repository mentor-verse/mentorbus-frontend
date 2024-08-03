// src/components/Onboarding.js
import { useRecoilValue } from "recoil";
import { isLoggedInAtom } from "@/atoms/isLoggedInAtom";

import { useState, useEffect } from "react";
import { Road } from "@/components/Icons/Road";
import { NextButton } from "@/components/Icons/NextButton";
import { Logo } from "@/components/Icons/Logo";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { userNameAtom } from "@/atoms/userNameAtom";
import React from "react";

interface FirstProps {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  sentence: string;
}

interface FormData {
  name: string;
}

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

  const setUserName = useSetRecoilState(userNameAtom);
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

  return (
    <div className="main flex flex-col min-h-screen overflow-hidden">
      <div className="main_content flex-1 flex flex-col">
        <div className="relative z-10 text-[#fff] flex flex-col items-center mt-[25%]">
          <div className="w-[300px] flex items-start justify-start mb-3 text-[12px]">
            {count}/4
          </div>
          <div className="w-[300px] flex justify-start items-start text-start">
            <Logo width={"175"} height="auto" />
          </div>
          <div className="w-[300px] flex items-start mt-[13px]  justify-start text-[26px] font-bold text-start">
            문장
          </div>
        </div>

        <div
          className="relative flex justify-center mt-10"
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
              <small className="text-sm text-[#fff]">
                {errors.name.message}
              </small>
            )}

            <div className="flex justify-end mt-3">
              <button className="flex" type="submit" disabled={isSubmitting}>
                <NextButton />
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="flex-grow"></div>{" "}
      <div className="w-full">
        <div className="grid place-items-center">
          <Road />
        </div>
      </div>
    </div>
  );
}
