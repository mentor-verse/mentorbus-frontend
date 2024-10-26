import { Logo2 } from "@/components/Icons/Logo";

export function OnboardingTitle() {
  return (
    <>
      <div className="grid place-items-center">
        <div className="text-[#fff] text-[26px] mt-[53%]">반가워요,</div>
        <Logo2 width={"241"} height={"62"} />
        <div className="text-[#fff] text-[22px] mt-2">
          세계에 오신 것을 환영합니다!
        </div>
      </div>
    </>
  );
}
