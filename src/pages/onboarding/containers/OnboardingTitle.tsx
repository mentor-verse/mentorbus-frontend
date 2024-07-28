import { Logo } from "@/components/Icons/Logo";

export function OnboardingTitle() {
  return (
    <>
        <div className="absolute top-1/3 left-1/2 transform -translate-x-[50%] -translate-y-1/2 grid place-items-center z-10">
            <div className="text-[#fff] text-[18px]">대학생과 청소년을 <b>메타버스</b>에서 잇다</div>
            <Logo width={"241"} height={"62"}/>
        </div>
        
    </>
  );
}
