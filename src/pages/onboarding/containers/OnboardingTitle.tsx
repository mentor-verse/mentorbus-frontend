import { Logo } from "@/components/Icons/Logo";

export function OnboardingTitle() {
  return (
    <>
      <div className="grid place-items-center">
        <div className="text-[#fff] text-[18px] mt-[53%]">
          대학생과 청소년을 <b>메타버스</b>에서 잇다
        </div>
        <Logo width={"241"} height={"62"} />
      </div>
    </>
  );
}
