import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { NextButton } from "@/components/Icons/NextButton";
import { Logo } from "@/components/Icons/Logo";

export function Third({ count, setCount, sentence }) {
  const { register, handleSubmit, formState: { errors, isSubmitted, isSubmitting } } = useForm();

  const onSubmit = (data) => {
    localStorage.setItem('userBelong', data.belong);
    setCount(count + 1);
  };

  return (
    <div>
      <div className="absolute top-1/4 left-1/2 transform -translate-x-[55%] -translate-y-2/3 z-10 text-[#fff]">
        <div className="flex items-start mb-3 text-[12px]">{count}/5</div>
        <div className="flex items-start text-[26px]"><Logo width={"175"} /></div>
        <div className="flex items-start text-[26px] font-bold w-max">{sentence}</div>
      </div>

      <div className="absolute top-1/3 left-1/2 transform -translate-x-[50%] -translate-y-1/3 mt-10">
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            className="w-[300px]"
            {...register("belong", {
              required: "소속정보는 필수입력입니다.",
            })}
            aria-invalid={isSubmitted ? (errors.belong ? "true" : "false") : undefined}
          />
          {errors.belong && <small className="text-sm text-[#fff]">{errors.belong.message}</small>}

          <div className="flex justify-end mt-3">
            <button 
              className="flex"
              type="submit"
              disabled={isSubmitting}
            >
              <NextButton />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
