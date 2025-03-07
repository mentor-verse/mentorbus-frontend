import { Banner2 } from "@/components/Icons/Banner";
import { Header } from "./containers/Header";
import { TitleSection } from "./containers/TitleSection";
import { College } from "@/components/ui/college";
import SNU from "@/assets/univ/SNU.webp";
import KU from "@/assets/univ/KU.webp";
import YU from "@/assets/univ/YU.webp";

import SGU from "@/assets/univ/SGU.webp";
import SKKU from "@/assets/univ/SKKU.webp";
import HYU from "@/assets/univ/HYU.webp";

import CAU from "@/assets/univ/CAU.webp";
import HUPS from "@/assets/univ/HUPS.webp";
import UOS from "@/assets/univ/UOS.webp";

import KKU from "@/assets/univ/KKU.webp";
import HU from "@/assets/univ/HU.webp";
import DU from "@/assets/univ/DU.webp";
import SSU from "@/assets/univ/SSU.webp";

import KMU from "@/assets/univ/KMU.webp";
import SMWU from "@/assets/univ/SMWU.webp";
import SU from "@/assets/univ/SU.webp";

import { MentorBox } from "@/components/ui/mentorbox";
import { MentorScheduleSection } from "@/pages/main/containers/MentorScheduleSection";
import React, { useEffect, useState } from "react";
import BottomNav from "@/containers/navbar";
import { useGetMentor } from "@/hooks/useGetMentor";
import { useQueryClient } from "@tanstack/react-query";
import { getMentorResDto } from "@/types/get";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserData } from "@/types/login/UserType";

interface CollegeType {
  img: string;
  name: string;
}

const colleges: CollegeType[] = [
  { img: SNU, name: "서울대학교" },
  { img: KU, name: "고려대학교" },
  { img: YU, name: "연세대학교" },

  { img: SGU, name: "서강대학교" },
  { img: SKKU, name: "성균관대학교" },
  { img: HYU, name: "한양대학교" },

  { img: CAU, name: "중앙대학교" },
  //경희대 KHU
  { img: HUPS, name: "한국외국어대학교" },
  { img: UOS, name: "서울시립대학교" },

  { img: KKU, name: "건국대학교" },
  { img: DU, name: "동국대학교" },
  { img: HU, name: "홍익대학교" },
  { img: SSU, name: "숭실대학교" },

  { img: KMU, name: "국민대학교" },
  { img: SMWU, name: "숙명여대" },
  { img: SU, name: "세종대학교" },
  //단국대
];

const getRandomColleges = (
  colleges: CollegeType[],
  count: number
): CollegeType[] => {
  const shuffled = [...colleges].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export function MainPage() {
  const [userName, setUserName] = useState<string | undefined>("");
  const [userMajor, setUserMajor] = useState<string | null | undefined>("");
  const [randomColleges, setRandomColleges] = useState<CollegeType[]>([]);
  const [position, setPosition] = useState<boolean | number | null>();
  const [mentorData, setMentorData] = useState<getMentorResDto[]>([]);

  const user = useSelector((state: RootState) => state.user);
  const [userData, setUserData] = useState<UserData | null>(user || null);

  useEffect(() => {
    setUserData(user);
  }, [user]);

  console.log("user", user);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    if (Array.isArray(user) && user.length > 0) {
      setUserData(user[0]);
      console.log("얍");
    } else {
      setUserData(null);
    }
  }, [user]);

  useEffect(() => {
    if (userData !== null) {
      console.log("userData", userData);
      setPosition(userData.isMentor);
      console.log("position", position);
      setUserMajor(userData.major || userData.interest);
      setUserName(userData.userName);
    }
  }, [position, userData, userMajor]);

  const {
    data: resp,
    isLoading,
    isError,
    refetch,
  } = useGetMentor({ major: userMajor });

  useEffect(() => {
    if (userData) {
      refetch();
    }
  }, [userData, refetch, navigate]);

  useEffect(() => {
    if (!queryClient.getQueryData(["getMentor"])) {
      refetch();
    }
  }, [queryClient, refetch]);

  useEffect(() => {
    setMentorData((resp as unknown as getMentorResDto[]) ?? []);
  }, [resp]);

  useEffect(() => {
    setRandomColleges(getRandomColleges(colleges, 16));
  }, []);

  if (isLoading) {
    return (
      <div
        style={{
          color: "#888888",
          fontSize: "25px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "50vh",
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

  // if (isError) return <p>에러가 발생했습니다.</p>;

  const renderMentorBoxes = () => (
    <>
      <TitleSection title2="대학별" title={""} major={""} title3={""} />
      <div className="overflow-x-auto ml-[28px] mt-[10px]">
        <div className="flex" style={{ width: "max-content" }}>
          {randomColleges.map((college, index) => (
            <React.Fragment key={index}>
              <College img={college.img} name={college.name} title={""} />
              {index < randomColleges.length - 1 && (
                <div className="ml-[13px]"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <TitleSection
        title={userName || undefined}
        title2="님에게 맞는"
        major={userMajor}
        title3="멘토"
      />
      <div className="flex mt-[20px] overflow-auto">
        {Array.isArray(mentorData) &&
          mentorData.map((mentorData, index) => (
            <div key={index}>
              <MentorBox
                name={mentorData?.nickname}
                major={mentorData?.major}
                gen={mentorData?.gen}
                info={mentorData?.character1}
              />
              <div className="ml-[13px]"></div>
            </div>
          ))}
      </div>
    </>
  );

  return (
    <>
      <div className="main">
        <div className="main_content overflow-hidden bg-white">
          <div style={{ background: "#fff" }}>
            <Header major={userMajor} className="mt-[50px]" title={""} />
            <div
              className="w-auto mt-[30px]"
              onClick={() =>
                window.open(
                  "https://www.instagram.com/mentorbus_official/",
                  "_blank"
                )
              }
            >
              <Banner2 />
            </div>
            {!Number(position) ? ( //db에 숫자로 저장되어있어서 숫자로 비교
              renderMentorBoxes()
            ) : (
              <MentorScheduleSection />
            )}
            <div className="mt-[120px]">
              {" "}
              <BottomNav />
            </div>
            {" "}
          </div>
        </div>
      </div>
    </>
  );
}
