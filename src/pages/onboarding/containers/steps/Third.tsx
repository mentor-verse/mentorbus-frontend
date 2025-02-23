import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { NextButton } from "@/components/Icons/NextButton";
import { Logo } from "@/components/Icons/Logo";
import React from "react";

interface FormData {
  belong: string;
}

interface ThirdProps {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  sentence: string;
}

export function Third({ count, setCount, sentence }: ThirdProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    const isMentor = localStorage.getItem("isMentor") === "true";
    if (isMentor) {
      localStorage.setItem("job", data.belong);
    } else {
      localStorage.setItem("school", data.belong);
    }

    setCount(count + 1);
  };

  return (
    <div className="relative flex flex-col items-center text-[#fff]">
      <div className="relative z-10 text-start mt-[25%]">
        <div className="w-[300px] justify-start flex items-start mb-3 text-[12px]">
          {count}/4
        </div>
        <div className="w-[300px] justify-start flex items-start text-[26px] ">
          <Logo width={"175"} height="auto" />
        </div>
        <div className="w-[300px] justify-start flex items-start text-[26px] font-bold  text-center">
          {sentence}
        </div>
      </div>

      <div className="relative flex flex-col items-center mt-10">
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            className="w-[300px]"
            {...register("belong", {
              required: "소속정보는 필수입력입니다.",
            })}
            aria-invalid={
              isSubmitted ? (errors.belong ? "true" : "false") : undefined
            }
          />
          {errors.belong && (
            <small className="text-sm text-[#fff]">
              {errors.belong.message}
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
  );
}
