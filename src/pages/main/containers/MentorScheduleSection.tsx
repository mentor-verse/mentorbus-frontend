import * as React from "react";
import { cn } from "@/libs/utils.ts";
import { ScheduleBox } from "@/components/ui/schedulebox";
import { TitleSection } from "./TitleSection";
import { useGetMentorSchedule } from "@/hooks/useGetMentorSchedule";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getMentorScheduleRes } from "@/types/get";

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
  const queryClient = useQueryClient();
  // localStorage에서 'ClassData' 불러오기

  // 불러온 데이터를 객체로 파싱 (배열 형태)
  const [classDataArray, setClassDataArray] = useState<getMentorScheduleRes[]>(
    []
  ); // Ensure it's initialized as an empty array

  const userId = 1234;
  const {
    data: resp,
    isLoading,
    isError,
    refetch,
  } = useGetMentorSchedule({ userId });

  useEffect(() => {
    if (!queryClient.getQueryData(["getMentorSchedule"])) {
      refetch();
    }
  }, [queryClient, refetch]);

  useEffect(() => {
    setClassDataArray(resp ? (Array.isArray(resp) ? resp : [resp]) : []);
    console.log("resp", resp);
  }, [resp]);

  if (isLoading) {
    return (
      <div
        style={{
          color: "#888888",
          fontSize: "25px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // 수평 중앙 정렬
          justifyContent: "center", // 수직 중앙 정렬
          height: "50vh", // 화면 전체 높이 설정
        }}
      >
        <div
          style={{
            width: "800px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          ⏰
        </div>
        로딩 중입니다<br></br>잠시 기다려주세요
      </div>
    ); // 로딩 상태일 때 표시할 내용
  }

  if (isError) return <p>에러발생 삐용삐용</p>;

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
        {(classDataArray || []).map((classData: any, index: number) => (
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
