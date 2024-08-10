import * as React from "react";
import { useEffect, useState } from "react";

export interface OpenClassSecondProps
  extends React.HTMLAttributes<HTMLDivElement> {
  Link: string;
  back_disable: string;
  back_work: string;
  onFieldsStatusChange: (isEmpty: boolean) => void; // 필드 상태 변경을 부모 컴포넌트로 알리기 위한 콜백
  onDateChange: (date: string) => void; // Add this
  onMaxPeopleChange: (maxPeople: string) => void; // Add this
}

const OpenClassSecond = React.forwardRef<HTMLDivElement, OpenClassSecondProps>(
  (
    { className, onFieldsStatusChange, onDateChange, onMaxPeopleChange },
    ref
  ) => {
    // Add the new props
    const [date, setDate] = useState("");
    const [maxPeople, setMaxPeople] = useState("");

    useEffect(() => {
      // 필드가 비어 있는지 여부를 부모 컴포넌트에 알림
      onFieldsStatusChange(date.trim() === "" || maxPeople.trim() === "");
    }, [date, maxPeople, onFieldsStatusChange]);

    useEffect(() => {
      // Pass the current date and maxPeople to parent
      onDateChange(date);
      onMaxPeopleChange(maxPeople);
    }, [date, maxPeople, onDateChange, onMaxPeopleChange]); // Add dependencies

    return (
      <>
        <div className={`font-semibold text-[16px] ${className}`} ref={ref}>
          <div className="grid place-items-center w-full">
            <div className="text-start w-[90%] mt-[100px] ">
              <div>멘토링 일시</div>
              <input
                type="datetime-local"
                className="mt-2 text-[14px] font-normal  border-none focus:outline-none w-[90%]"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <div className="h-[1px] mt-2 w-[90%] bg-[#E6E6E6]"></div>
              <div className="mt-[35px]">최대 멘토링 인원</div>
              <input
                type="number"
                className="mt-2 text-[14px] font-normal border-none focus:outline-none w-[90%]"
                placeholder="최대 멘토링 인원을 입력하세요"
                value={maxPeople}
                onChange={(e) => setMaxPeople(e.target.value)}
              />
              <div className="h-[1px] mt-2 w-[90%] bg-[#E6E6E6]"></div>
            </div>
          </div>
        </div>
      </>
    );
  }
);

OpenClassSecond.displayName = "OpenClassSecond";

export { OpenClassSecond };
