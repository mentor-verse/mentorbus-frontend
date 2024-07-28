import { NextButton } from "@/components/Icons/NextButton";
import { Logo } from "@/components/Icons/Logo";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from 'recoil';
import { userNameAtom } from '@/atoms/userNameAtom';

export function First({ count, setCount, sentence }) {
  const setUserName = useSetRecoilState(userNameAtom);
  const { register, handleSubmit, formState: { errors, isSubmitted, isSubmitting } } = useForm();

  const onSubmit = (data) => {
    setUserName(data.name);
    localStorage.setItem('userName', data.name);
    setCount(count + 1);
  };

  return (
    <>
      <div className="absolute top-1/4 left-1/2 transform -translate-x-[70%] -translate-y-2/3 z-10 text-[#fff]">
        <div className="flex items-start mb-3 text-[12px]">{count}/5</div>
        <div className="flex items-start"><Logo width={"175"} /></div>
        <div className="flex items-start mt-[13px] text-[26px] font-bold w-max">{sentence}</div>
      </div>

      <div className="absolute top-1/3 left-1/2 transform -translate-x-[50%] -translate-y-1/3 mt-10">
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            className="w-[298px]"
            {...register("name", {
              required: "이름은 필수 입력입니다.",
            })}
            aria-invalid={isSubmitted ? (errors.name ? "true" : "false") : undefined}
          />
          {errors.name && <small className="text-sm text-[#fff]">{errors.name.message}</small>}

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
    </>
  );
}
