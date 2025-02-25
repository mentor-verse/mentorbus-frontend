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
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { UserData } from "@/types/login/UserType";

export function MyPage() {
  const user = useSelector((state: RootState) => state.user);
  const [userData, setUserData] = useState<UserData | null>(user || null);

  useEffect(() => {
    if (Array.isArray(user) && user.length > 0) {
      setUserData(user[0]);
      console.log("얍");
    } else {
      setUserData(null);
    }
  }, [user]);

  console.log("userData", userData);

  const renderLevelIcon = () => {
    if (userData?.isMentor === true) {
      switch (userData?.level) {
        case 1:
          return <LevelFirstMentor />;
        case 2:
          return <LevelSecondMentor />;
        case 3:
          return <LevelThirdMentor />;
        case 4:
          return <LevelFourthMentor />;
        default:
          return null;
      }
    } else {
      switch (userData?.level) {
        case 1:
          return <LevelFirst />;
        case 2:
          return <LevelSecond />;
        case 3:
          return <LevelThird />;
        case 4:
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
                name={userData?.userName || "Unknown"}
                school={userData?.job || "Unknown School"}
                level={userData?.level}
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
