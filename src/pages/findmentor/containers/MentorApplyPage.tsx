import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FindTitle from "./FindTitle";
import { MentorInfo } from "./MentorInfo";
import { SearchBox } from "@/components/ui/searchbox";
import { Button } from "@/components/ui/button";
import { ApplyFinished } from "./ApplyFinished";
import { usePostClassApply } from "@/hooks/usePostClassApply";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { UserData } from "@/types/login/UserType";
import { postClassApplyProps } from "@/types/post";

export function MentorApplyPage() {
  const [isApplied, setIsApplied] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const selectedBox = location.state?.selectedBox;

  const user = useSelector((state: RootState) => state.user);
  const [userData, setUserData] = useState<UserData | null>(user || null);
  const [userId, setUserId] = useState<postClassApplyProps>();
  const [classId, setClassId] = useState<postClassApplyProps>();

  useEffect(() => {
    if (Array.isArray(user) && user.length > 0) {
      setUserData(user[0]);
    } else {
      setUserData(null);
    }
  }, [user]);

  useEffect(() => {
    setUserId(userData?.userId);
  }, [userData]);

  console.log("userData", userData);
  console.log("userId", userId);

  useEffect(() => {
    setClassId(selectedBox.classId);
  }, [selectedBox]);

  const { mutateAsync: applyClass } = usePostClassApply();

  const handleApplyClick = async () => {
    console.log("Button clicked!");
    try {
      await applyClass({
        userId: userId,
        classId: classId,
      });

      navigate("/qabus");
    } catch (e) {
      console.error(e);
    }
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

    navigate(`/mentorbus?name=${selectedBox.name}`);
    console.log("selectedBox", selectedBox);
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
        <div
          style={{
            background: "#fff",
            flex: "1",
            display: "flex",
            flexDirection: "column",
          }}
        >
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
                    major={selectedBox.title}
                    name={selectedBox.name}
                    info={selectedBox.major}
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
                <MentorInfo content={selectedBox.content} />
              </div>
            </>
          ) : (
            <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
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
