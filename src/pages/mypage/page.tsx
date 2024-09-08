import {
  LevelThird,
  LevelFirst,
  LevelSecond,
  LevelFourth,
  LevelFirstMentor,
  LevelSecondMentor,
  LevelThirdMentor,
  LevelFourthMentor,
} from "@/components/Icons/MyPageIcon";
import { Profile } from "./containers/ProfileSection";
import { useEffect, useState } from "react";
import { Cloud } from "@/components/Icons/Cloud";
import { Cloud2 } from "@/components/Icons/Cloud2";
import BottomNav from "@/containers/navbar";

export function MyPage() {
  const [userName, setUserName] = useState("");
  const [userBelong, setUserBelong] = useState("");
  const [level] = useState("3"); // 기본값을 설정하거나 필요에 따라 변경 가능
  const [position, setPosition] = useState("");

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }

    const storedUserBelong = localStorage.getItem("userBelong");
    if (storedUserBelong) {
      setUserBelong(storedUserBelong);
    }

    const storedPosition = localStorage.getItem("position");
    if (storedPosition) {
      setPosition(storedPosition);
    }
  }, []);

  const renderLevelIcon = () => {
    if (position === "멘토") {
      switch (level) {
        case "1":
          return <LevelFirstMentor />;
        case "2":
          return <LevelSecondMentor />;
        case "3":
          return <LevelThirdMentor />;
        case "4":
          return <LevelFourthMentor />;
        default:
          return null;
      }
    } else {
      switch (level) {
        case "1":
          return <LevelFirst />;
        case "2":
          return <LevelSecond />;
        case "3":
          return <LevelThird />;
        case "4":
          return <LevelFourth />;
        default:
          return null;
      }
    }
  };

  return (
    <>
      <div className="main flex flex-col min-h-screen overflow-hidden">
        <div className="main_content ">
          <div className="fixed  w-full z-0">
            <div className="fixed top-[10vh] -right-11 ">
              <Cloud />
            </div>
            <div className="fixed left-0 top-[20vh] ">
              <Cloud2 />
            </div>
          </div>
          <div className="flex flex-col justify-center items-center mt-[90px]">
            <div>{renderLevelIcon()}</div>
            <div className="divMargin"></div>
            <div className="mb-[150px]">
              <Profile
                name={userName}
                school={userBelong}
                level={"3"}
                gen="man"
              />
            </div>
          </div>
        </div>

        <div className="w-full">
          <BottomNav />
        </div>
      </div>
    </>
  );
}
