import { Rocket } from "@/components/Icons/Rocket";

export function ApplyFinished() {

    return (
      <>
         <div className="text-[#2F2F2F]">
             <div className="text-lg not-italic font-semibold text-[20px] mt-[0px]">
                신청이 완료되었습니다!
              </div>
              <div className="grid place-items-center">
              <Rocket />
              </div>
              <div className=" text-lg not-italic font-medium text-[16px] mt-[20px]">
                 <p className="flex justify-center w-[330px] tracking-[-0.1em]">
                    멘토링 신청 정보는
                    &nbsp;
                    <p className="font-bold text-[#1FA7F2]">멘토버스</p>
                    
                    에서 확인 가능합니다</p>
              </div>
         </div>
             
      </>
    );
  }
  