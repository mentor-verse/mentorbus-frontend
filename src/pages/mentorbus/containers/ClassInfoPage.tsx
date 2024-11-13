import { useLocation, useNavigate } from "react-router-dom";
import { SearchBox } from "@/components/ui/searchbox";
import { Button } from "@/components/ui/button";
import FindTitle from "@/pages/findmentor/containers/FindTitle";
import { useEffect } from "react";

export function ClassInfoPage() {
  const location = useLocation();
  const navigate = useNavigate();
  // Destructure the state object with default values
  const { selectedBox, content, classData } = location.state || {}; // Destructure with default values

  useEffect(() => {
    console.log("Location state:", location.state);
    console.log("data:", selectedBox); // Should log the correct data
    console.log("content:", content); // Should log the content
  }, [location.state, selectedBox, content]);

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
                title="멘토링 정보"
                Link={""}
                back_disable={""}
                back_work={""}
              />
            </div>
            {selectedBox && (
              <div className="grid place-content-center mt-[25px] border-b-[0.7px] w-full border-[#C0C0C0] h-[180px]">
                <SearchBox
                  gen={selectedBox.gen}
                  major={selectedBox.title}
                  name={selectedBox.name || ""}
                  info={selectedBox.major || ""}
                  date={selectedBox.date}
                  sort={selectedBox.sort}
                  variant="null"
                  size="state"
                >
                  {selectedBox.name}
                </SearchBox>
              </div>
            )}

            <div className="mt-[40px] flex justify-center">
              <div className=" text-[12px] not-italic font-normal leading-[normal] tracking-[-0.52px] text-[#474747] text-start w-[80%] items-center">
                <div className="w-full" style={{ whiteSpace: "pre-line" }}>
                  {content}
                </div>
              </div>
            </div>
          </>
        </div>
        <div className="flex justify-center mb-5 mt-[30%]">
          <Button
            variant={"default"}
            size={"default"}
            className="w-[342px] h-[56px] text-[#fff] font-semibold"
            onClick={() =>
              navigate("/openclass", {
                state: {
                  classData,
                },
              })
            }
          >
            수정하기
          </Button>
        </div>
      </div>
    </div>
  );
}
