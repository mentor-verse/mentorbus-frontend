// src/components/MainPage.tsx
import React, { useEffect, useState } from "react";
import useUser from "@/hooks/useUser";
import { Banner } from "@/components/Icons/Banner";
import { Header } from "./containers/Header";
import { TitleSection } from "./containers/TitleSection";
import { College } from "@/components/ui/college";
import SU from "@/assets/SU.svg";
import SSU from "@/assets/SSU.svg";
import Seoul from "@/assets/Seoul.svg";
import SOF from "@/assets/SOU.svg";
import YU from "@/assets/YU.svg";
import HU from "@/assets/HU.svg";
import CAU from "@/assets/CAU.svg";
import BottomNav from "@/containers/navbar";
import { MentorBox } from "@/components/ui/mentorbox";

const colleges = [
  { img: SSU, name: "숭실대학교" },
  { img: CAU, name: "중앙대학교" },
  { img: Seoul, name: "서울대학교" },
  { img: HU, name: "한양대학교" },
  { img: SU, name: "세종대학교" },
  { img: YU, name: "연세대학교" },
  { img: SOF, name: "서울시립대학교" },
];

const getRandomColleges = (
  colleges: { img: string; name: string }[],
  count: number | undefined
) => {
  const shuffled = [...colleges].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export function MainPage() {
  const { data: user } = useUser();
  const [randomColleges, setRandomColleges] = useState([]);

  useEffect(() => {
    setRandomColleges(getRandomColleges(colleges, 7));
  }, []);

  return (
    <div className="main">
      <div className="main_content overflow-hidden bg-white">
        <Header major={user?.major} className="mt-[50px]" title={""} />
        <div className="w-auto mt-[30px]">
          <Banner />
        </div>
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
          title={user?.name}
          title2="님에게 맞는"
          major={user?.major}
          title3="멘토"
        />
        <div className="flex mt-[20px] overflow-auto">
          <MentorBox
            name="편유나"
            major="숭실대학교 글로벌미디어학부"
            gen="woman"
            info="-숭실대학교 재학"
          />
          <div className="ml-[13px]"></div>
          <MentorBox
            name="편유나"
            major="숭실대학교 글로벌미디어학부"
            gen="woman"
            info="-숭실대학교 재학"
          />
          <div className="ml-[13px]"></div>
          <MentorBox
            name="편유나"
            major="숭실대학교 글로벌미디어학부"
            gen="woman"
            info="-숭실대학교 재학"
          />
          <div className="ml-[13px]"></div>
          <MentorBox
            name="편유나"
            major="숭실대학교 글로벌미디어학부"
            gen="woman"
            info="-숭실대학교 재학"
          />
        </div>
        <div className="mt-[120px]"></div>
        <BottomNav />
      </div>
    </div>
  );
}
