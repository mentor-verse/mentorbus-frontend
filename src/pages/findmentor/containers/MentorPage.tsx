import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FindTitle from "./FindTitle";
import { MentorInfo } from "./MentorInfo";
import { SearchBox } from "@/components/ui/searchbox";
import { Button } from "@/components/ui/button";
import { ApplyFinished } from "./ApplyFinished";

export function MentorPage() {
  const [isApplied, setIsApplied] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const selectedBox = location.state?.selectedBox;

  const handleApplyClick = () => {
    setIsApplied(true);
  };

  const handleRedirectToMentorBus = () => {
    setIsApplied(true);
    const appliedItems = JSON.parse(
      localStorage.getItem("appliedItems") || "[]"
    );
    if (selectedBox) {
      appliedItems.push({
        ...selectedBox,
        status: "pending",
      });
      localStorage.setItem("appliedItems", JSON.stringify(appliedItems));
    }

    navigate("/mentorbus-frontend/mentorbus");
  };

  return (
    <div className="main">
      <div
        className="main_content"
        style={{
          background: "#fff",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <div style={{ background: "#fff", flex: "1" }}>
          {!isApplied ? (
            <>
              <div>
                <FindTitle
                  title="멘토링 정보"
                  Link={""}
                  back_disable={""}
                  back_work={""}
                />
              </div>
              {selectedBox && (
                <div className="grid place-content-center mt-[25px] border-b-[0.7px] border-[#C0C0C0] h-[180px]">
                  <SearchBox
                    gen={selectedBox.gen}
                    major={selectedBox.major}
                    name={selectedBox.name}
                    info={selectedBox.info}
                    date={selectedBox.date}
                    sort={selectedBox.sort}
                    variant="null"
                    size="state"
                  >
                    {selectedBox.text}
                  </SearchBox>
                </div>
              )}
              <div className="mt-[40px]">
                <MentorInfo
                  content="소위 말하는 인서울 대학,
학교 선생님들이 말씀 하시는 것처럼
3등급 이하의 학생들은 ‘절대’ 들어갈 수 없는 걸까요?

가끔씩 기적처럼 들려오는 학종 합격 소식들은
모두 특목고 학생들만의 이야기일까요?

그 기적이 ‘나의 것’이 될 수는 없는 걸까요?

일반고등학교에서 그 기적을 이뤄낸 노하우를 공유합니다.


[ 강연 순서 ]

강사 소개
글로벌미디어학부 전공 소개
기적처럼 합격하는 생활기록부 만들기
내신 상향 그래프를 위한 시간 관리법
Q&A"
                />
              </div>
            </>
          ) : (
            <div
              className="flex justify-center items-center"
              style={{
                height: "calc(100vh - 56px)", // Adjust based on other elements' height
                width: "100%",
              }}
            >
              <ApplyFinished />
            </div>
          )}
        </div>
        <div className="bottom_button">
          <Button
            variant={"default"}
            size={"default"}
            className="w-[342px] h-[56px] text-[#fff] font-semibold"
            onClick={isApplied ? handleRedirectToMentorBus : handleApplyClick}
          >
            {isApplied ? "멘토버스 바로가기" : "신청하기"}
          </Button>
        </div>
      </div>
    </div>
  );
}
