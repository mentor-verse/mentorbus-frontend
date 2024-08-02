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
  const selectedBox = location.state?.selectedBox; // Access the passed data

  const handleApplyClick = () => {
    setIsApplied(true);
  };

  const handleRedirectToMentorBus = () => {
    if (selectedBox) {
      // Save selectedBox to localStorage
      localStorage.setItem("selectedBox", JSON.stringify(selectedBox));
    }
    navigate("/mentorbus-frontend/mentorbus");
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main content section */}
      <div className="flex-grow">
        <div className="main_content" style={{ background: "#fff" }}>
          <div style={{ background: "#fff" }}>
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
                      sort={selectedBox.sort}
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
              <div className="absolute top-1/2 right-1/2 transform translate-x-[50%] -translate-y-1/2">
                <ApplyFinished />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer section with the button */}
      <div className="flex justify-center mb-5">
        <Button
          variant={"default"}
          size={"default"}
          className="w-[340px] h-[52px] text-[#fff] font-semibold"
          onClick={isApplied ? handleRedirectToMentorBus : handleApplyClick}
        >
          {isApplied ? "멘토버스 바로가기" : "바로가기"}
        </Button>
      </div>
    </div>
  );
}
