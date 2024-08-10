import { useLocation, useNavigate } from "react-router-dom";
import { SearchBox } from "@/components/ui/searchbox";
import { Button } from "@/components/ui/button";
import FindTitle from "@/pages/findmentor/containers/FindTitle";

export function ClassInfoPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedBox, content } = location.state || {};

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
              <div className="grid place-items-center mt-[25px] border-b-[0.7px] border-[#C0C0C0] h-[180px]">
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
                  {selectedBox.name}
                </SearchBox>
              </div>
            )}
            <div className="mt-[40px]">
              <div className="text-[13px] not-italic font-semibold leading-[normal] tracking-[-0.52px]">
                <div>{content}</div>
              </div>
            </div>
          </>
        </div>
        <div className="flex justify-center mb-5 mt-[30%]">
          <Button
            variant={"default"}
            size={"default"}
            className="w-[342px] h-[56px] text-[#fff] font-semibold"
            onClick={() => navigate("/mentorbus-frontend/mentorbus")}
          >
            수정하기
          </Button>
        </div>
      </div>
    </div>
  );
}
