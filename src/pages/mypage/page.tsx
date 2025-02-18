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
import { useGetProfile } from "@/hooks/useGetProfile";
import { useQueryClient } from "@tanstack/react-query";
import { getProfileRes } from "@/types/get";

export function MyPage() {
  const queryClient = useQueryClient();
  const [level] = useState("3"); // 기본값을 설정하거나 필요에 따라 변경 가능
  const [userData, setUserData] = useState<getProfileRes | null>(null);

  const userId = 3645188105;
  const { data: resp, isLoading, isError, refetch } = useGetProfile({ userId });

  useEffect(() => {
    if (!queryClient.getQueryData(["get-profile"])) {
      refetch();
    }
  }, [queryClient, refetch]);

  useEffect(() => {
    if (resp) {
      setUserData(resp);
    }
  }, [resp]);

  const renderLevelIcon = () => {
    if (userData?.isMentor === true) {
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

  if (isLoading) {
    return (
      <div
        style={{
          color: "#888888",
          fontSize: "25px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // 수평 중앙 정렬
          justifyContent: "center", // 수직 중앙 정렬
          height: "50vh", // 화면 전체 높이 설정
        }}
      >
        <div
          style={{
            width: "800px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          ⏰
        </div>
        로딩 중입니다<br></br>잠시 기다려주세요
      </div>
    );
  }

  if (isError) return <p>에러발생 삐용삐용</p>;

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
