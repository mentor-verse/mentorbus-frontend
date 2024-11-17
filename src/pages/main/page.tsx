import { Banner2 } from "@/components/Icons/Banner";
import { Header } from "./containers/Header";
import { TitleSection } from "./containers/TitleSection";
import { College } from "@/components/ui/college";
import SU from "@/assets/SU.webp";
import SSU from "@/assets/SSU.webp";
import Seoul from "@/assets/Seoul.webp";
import SOF from "@/assets/SOU.svg";
import YU from "@/assets/YU.webp";
import HU from "@/assets/HU.webp";
import CAU from "@/assets/CAU.webp";
import KU from "@/assets/KU.webp";
import SGU from "@/assets/SGU.webp";
import FU from "@/assets/FU.webp";
import KKU from "@/assets/KKU.webp";
import DKU from "@/assets/DKU.webp";
import KMU from "@/assets/KMU.webp";
import SMU from "@/assets/SMU.webp";
import HIU from "@/assets/HIU.webp";

import { MentorBox } from "@/components/ui/mentorbox";
import { MentorScheduleSection } from "@/pages/main/containers/MentorScheduleSection"; // Import the new component
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios to make API requests
import BottomNav from "@/containers/navbar";
// Define the College type
interface CollegeType {
  img: string;
  name: string;
}

const colleges: CollegeType[] = [
  { img: Seoul, name: "서울대학교" },
  { img: KU, name: "고려대학교" },
  { img: YU, name: "연세대학교" },
  { img: SU, name: "성균관대학교" },
  { img: SGU, name: "서강대학교" },
  { img: HU, name: "한양대학교" },
  { img: CAU, name: "중앙대학교" },
  { img: FU, name: "한국외국어대학교" },
  { img: SOF, name: "서울시립대학교" },
  { img: KKU, name: "건국대학교" },
  { img: DKU, name: "동국대학교" },
  { img: HIU, name: "홍익대학교" },
  { img: KMU, name: "국민대학교" },
  { img: SSU, name: "숭실대학교" },
  { img: SMU, name: "숙명여대" },
  { img: SU, name: "세종대학교" },
];

const getRandomColleges = (
  colleges: CollegeType[],
  count: number
): CollegeType[] => {
  const shuffled = [...colleges].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

type SearchBoxType = {
  character1: string;
  nickname: string;
  num: string;
  title: string;
  gen: string;
  major: string;
  name: string;
  info: string;
  date: string;
  text: string;
  sort: string;
};

export function MainPage() {
  const [userName, setUserName] = useState<string | null>("");
  const [major, setUserMajor] = useState<string>("");
  const [randomColleges, setRandomColleges] = useState<CollegeType[]>([]);
  const [position, setPosition] = useState<string | null>(null);
  const location = useLocation();
  const [userData, setUserData] = useState<any>(null); // 배열 대신 객체(null로 초기화)
  const [kakaoId, setKakaoId] = useState<string | null>(null); // kakaoId 상태값으로 설정
  const navigate = useNavigate();
  const [mentorData, setMentorData] = useState<SearchBoxType[]>([]); // API에서 불러온 데이터를 저장할 state
  const [, setLoading] = useState(true); // 로딩 상태

  // URL에서 kakaoId를 가져오는 함수
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const urlKakaoId = searchParams.get("userId"); // URL에서 userId 파라미터로 kakaoId 추출
    if (urlKakaoId) {
      setKakaoId(urlKakaoId); // 상태 업데이트
      localStorage.setItem("kakao_id", urlKakaoId); // localStorage에 저장
    } else {
      const storedKakaoId = localStorage.getItem("kakao_id");
      if (storedKakaoId) {
        setKakaoId(storedKakaoId);
      }
    }
  }, [location.search]);

  // kakaoId가 있을 때 백엔드 API 호출
  useEffect(() => {
    if (kakaoId) {
      // 백엔드 API 호출
      axios
        .get(
          `https://port-0-mentorbus-backend-m0zjsul0a4243974.sel4.cloudtype.app/onboarding/userdata/${kakaoId}`
        )
        .then((response: { data: { position: any } }) => {
          // 성공적으로 데이터를 가져왔을 때
          setUserData(response.data);
          console.log("userData", userData);
          setPosition(response.data.position);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          navigate(`/onboarding?specialQuery=true?userId=${kakaoId}`);
        });
    }
  }, [kakaoId]); // kakaoId가 변경될 때마다 실행

  // API에서 특정 멘토 데이터를 불러오는 함수
  const loadSpecificMentorClasses = async (major: string) => {
    try {
      const response = await axios.get(
        `https://port-0-mentorbus-backend-m0zjsul0a4243974.sel4.cloudtype.app/mentor/data/${major}`
      );

      if (response.status === 200) {
        console.log("response", response);

        const MentorDataFromApi = Array.isArray(response.data)
          ? response.data
          : [response.data];
        setMentorData(MentorDataFromApi); // 데이터를 searchBoxes 상태에 저장
      } else {
        setMentorData([]); // 데이터가 배열이 아닐 경우 빈 배열로 설정
      }
    } catch (error) {
      setMentorData([]); // 오류 발생 시 빈 배열로 설정
    } finally {
      setLoading(false); // 데이터 로드 완료 후 로딩 상태를 false로 설정
    }
  };

  // mainFilter와 subFilter가 변경될 때마다 적절한 데이터를 로드
  useEffect(() => {
    loadSpecificMentorClasses(major); // subFilter (info 값)으로 loadSpecificClasses 호출
  }, [major]); // subFilter 값이 변경될 때마다 호출

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  useEffect(() => {
    const storedUserMajor = localStorage.getItem("major");
    if (storedUserMajor) {
      setUserMajor(storedUserMajor);
    }
  }, []);

  useEffect(() => {
    setRandomColleges(getRandomColleges(colleges, 16));
  }, []);

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
        major={major}
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
            <Header major={major} className="mt-[50px]" title={""} />
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
            {position === "멘티" ? (
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
