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
    let appliedItems = JSON.parse(localStorage.getItem("appliedItems") || "[]");
    if (selectedBox) {
      appliedItems.push({
        ...selectedBox,
        status: "pending",
      });
      localStorage.setItem("appliedItems", JSON.stringify(appliedItems));
    }
  };

  const handleRedirectToMentorBus = () => {
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
                  title="멘토정보"
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
                <MentorInfo content="안녀ㅑㅇ" order="하이" />
              </div>
            </>
          ) : (
            <div className="grid place-items-center mt-[45%]">
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
