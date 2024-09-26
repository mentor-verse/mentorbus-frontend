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

interface UserData {
  nickname: string;
  school: string;
  position: string;
}

export function MyPage() {
  const [level] = useState("3"); // 기본값을 설정하거나 필요에 따라 변경 가능
  const [userData, setUserData] = useState<UserData | null>(null);
  const [, setError] = useState<string | null>(null);

  useEffect(() => {
    const nickname = localStorage.getItem("userName");

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://port-0-mentorbus-backend-m0zjsul0a4243974.sel4.cloudtype.app/mydata/${nickname}`
        );

        if (!response.ok) {
          throw new Error("User data not found");
        }

        const data = await response.json();
        setUserData(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message); // err is now recognized as an Error
        } else {
          setError("An unknown error occurred");
        }
      }
    };

    fetchData();
  }, []);

  const renderLevelIcon = () => {
    if (userData?.position === "멘토") {
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
                name={userData?.nickname || "Unknown"}
                school={userData?.school || "Unknown School"}
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
