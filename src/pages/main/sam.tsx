import { ScheduleBox } from "@/components/ui/schedulebox";

export function Sam() {
  // localStorage에서 'ClassData' 불러오기
  const classDataString = localStorage.getItem("ClassData");

  // 불러온 데이터를 객체로 파싱
  const classData = classDataString ? JSON.parse(classDataString)[0] : null;

  // 필요한 값 추출
  const major = classData?.title || "Default Major";
  const date = classData?.date || "Default Date";

  console.log("Received data in Sam:", { major, date });

  return (
    <div>
      <div className="main flex flex-col min-h-screen overflow-hidden bg-white"></div>
      <ScheduleBox major={major} date={date} variant="default" size="state">
        D-day
      </ScheduleBox>
    </div>
  );
}
