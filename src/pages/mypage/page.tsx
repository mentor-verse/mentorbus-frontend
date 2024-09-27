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
import axios from "axios";

interface UserData {
  nickname: string;
  school: string;
  position: string;
}

export function MyPage() {
  const [level] = useState("3"); // 기본값을 설정하거나 필요에 따라 변경 가능
  const [MentorData, setMentorData] = useState<UserData | null>(null);

  // 멘토 데이터를 가져오는 함수
  useEffect(() => {
    const kakao_id = localStorage.getItem("kakao_id");

    if (kakao_id) {
      // 백엔드 API 호출
      axios
        .get(`/onboarding/mentor/${kakao_id}`)
        .then((response) => {
          // 성공적으로 데이터를 가져왔을 때
          setMentorData(response.data);
          console.log("Mentor data:", response.data);
        })
        .catch((error) => {
          console.error("Error fetching mentor data:", error);
        });
    }
  }, []); // []를 사용하여 컴포넌트가 처음 마운트될 때 한 번만 실행

  const renderLevelIcon = () => {
    if (MentorData?.position === "멘토") {
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
                name={MentorData?.nickname || "Unknown"}
                school={MentorData?.school || "Unknown School"}
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
