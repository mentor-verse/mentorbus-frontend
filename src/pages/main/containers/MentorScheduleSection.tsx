import * as React from "react";
import { cn } from "@/libs/utils.ts";
import { ScheduleBox } from "@/components/ui/schedulebox";
import { TitleSection } from "./TitleSection";

export interface MentorScheduleSectionProps
  extends React.HTMLAttributes<HTMLDivElement> {}

// 디데이 계산 함수
const calculateDday = (targetDate: string) => {
  const now = new Date();
  const eventDate = new Date(targetDate);

  // 밀리초 단위로 차이를 구한 후 일 단위로 변환
  const differenceInTime = eventDate.getTime() - now.getTime();
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));

  return differenceInDays > 0 ? `D-${differenceInDays}` : `D-Day`;
};

const MentorScheduleSection = React.forwardRef<
  HTMLDivElement,
  MentorScheduleSectionProps
>(({ className }, ref) => {
  // localStorage에서 'ClassData' 불러오기
  const classDataString = localStorage.getItem("ClassData");

  // 불러온 데이터를 객체로 파싱 (배열 형태)
  const classDataArray = classDataString ? JSON.parse(classDataString) : [];

  return (
    <div ref={ref}>
      <TitleSection
        title2="나의 멘토링 일정"
        title={""}
        major={""}
        title3={""}
      />
      <div
        className={cn(
          "flex flex-col space-y-4 not-italic font-bold text-[14px] text-black ml-[28px] mt-[30px]",
          className
        )}
      >
        {classDataArray.map((classData: any, index: number) => (
          <ScheduleBox
            key={index}
            major={classData.title || "Default Major"}
            date={classData.date || "Default Date"}
            variant="default"
            size="state"
          >
            {/* 디데이 계산 결과 출력 */}
            {calculateDday(classData.date)}
          </ScheduleBox>
        ))}
      </div>
    </div>
  );
});

MentorScheduleSection.displayName = "MentorScheduleSection";

export { MentorScheduleSection };
