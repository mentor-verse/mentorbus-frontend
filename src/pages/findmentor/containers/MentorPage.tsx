import  { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FindTitle  from "./FindTitle";
import { MentorInfo } from "./MentorInfo";
import { SearchBox } from "@/components/ui/searchbox";
import { Button } from "@/components/ui/button";
import { ApplyFinished } from "./ApplyFinished";

export function MentorPage() {
  const [isApplied, setIsApplied] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const selectedBox = location.state?.selectedBox; // Access the passed data

  const handleApplyClick = () => {
    setIsApplied(true);
  };

  const handleRedirectToMentorBus = () => {
    if (selectedBox) {
      // Save selectedBox to localStorage
      localStorage.setItem('selectedBox', JSON.stringify(selectedBox));
    }
    navigate('/mentorbus-frontend/mentorbus');
  };

  return (
    <div className="main">
      <div className="main_content" style={{ background: '#fff' }}>
        <div style={{ background: '#fff' }}>
          {!isApplied ? (
            <>
              <div>
                <FindTitle title="멘토정보" />
              </div>
              {selectedBox && (
                <div className="grid place-items-center mt-[25px] border-b-[0.7px] border-[#C0C0C0] h-[180px]">
                  <SearchBox
                    gen={selectedBox.gen}
                    major={selectedBox.major}
                    name={selectedBox.name}
                    info={selectedBox.info}
                    date={selectedBox.date}
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
              <div className="absolute top-full right-1/2 transform translate-x-[50%] -translate-y-full -mt-[30px]">
                <Button
                  variant={"default"}
                  size={"default"}
                  className="w-[342px] h-[56px] text-[#fff] font-semibold"
                  onClick={handleApplyClick}
                >
                  신청하기
                </Button>
              </div>
            </>
          ) : (
            <div>
              <div className="absolute top-1/2 right-1/2 transform translate-x-[50%] -translate-y-1/2">
                <ApplyFinished />
              </div>
              <div className="absolute top-full right-1/2 transform translate-x-[50%] -translate-y-full -mt-[30px]">
                <Button
                  variant={"default"}
                  size={"default"}
                  className="w-[342px] h-[56px] text-[#fff] font-semibold"
                  onClick={handleRedirectToMentorBus}
                >
                  멘토버스 바로가기
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
