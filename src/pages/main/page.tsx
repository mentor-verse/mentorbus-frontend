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
  { img: SSU, name: "숭실대학교" },
  { img: CAU, name: "중앙대학교" },
  { img: Seoul, name: "서울대학교" },
  { img: HU, name: "한양대학교" },
  { img: SU, name: "세종대학교" },
  { img: YU, name: "연세대학교" },
  { img: SOF, name: "서울시립대학교" },
];

const getRandomColleges = (
  colleges: CollegeType[],
  count: number
): CollegeType[] => {
  const shuffled = [...colleges].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export function MainPage() {
  const [userName, setUserName] = useState<string | null>("");
  const [userMajor, setUserMajor] = useState<string>("");
  const [randomColleges, setRandomColleges] = useState<CollegeType[]>([]);
  const [position, setPosition] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any[]>([]);
  const [menteeData, setMenteeData] = useState<any[]>([]);

  // Fetch mentor data from the server where position is "멘토"

  /*
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://port-0-mentorbus-backend-m0zjsul0a4243974.sel4.cloudtype.app/api/login/${userName}`
        );

        console.log("Response:", response);

        if (!response.ok) {
          throw new Error("Failed to fetch mentor data");
        }

        const data = await response.json();
        console.log("Data:", data);
        setMentorData(data); // Update the state with the fetched mentor data
      } catch (error) {
        console.error("Error fetching mentor data:", error);
      }
    };

    fetchData();
  }, [userName]); // Add userName to the dependency array
*/
  /*
  useEffect(() => {
    const storedPosition = localStorage.getItem("position");
    const userName = localStorage.getItem("userName");
    const userBelong = localStorage.getItem("userBelong");
    const major = localStorage.getItem("major");

    if (!(storedPosition && userName && userBelong && major)) {
      navigate(`/mentorbus-frontend/onboarding?specialQuery=true`);
    } else {
      setPosition(storedPosition);
    }
  }, [navigate]);
  '*/

  // 멘토 데이터를 가져오는 함수
  useEffect(() => {
    const kakao_id = localStorage.getItem("kakao_id");

    if (kakao_id) {
      // 백엔드 API 호출
      axios
        .get(
          `https://port-0-mentorbus-backend-m0zjsul0a4243974.sel4.cloudtype.app/onboarding/userdata/${kakao_id}`
        )
        .then((response) => {
          // 성공적으로 데이터를 가져왔을 때
          setUserData(response.data);
          console.log("user data:", response.data);
          console.log("position:", userData.position);
          setPosition(userData.position);
        })
        .catch((error) => {
          console.error("Error fetching mentor data:", error);
        });
    }
  }, []); // []를 사용하여 컴포넌트가 처음 마운트될 때 한 번만 실행

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const storedUserName = searchParams.get("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    } else {
      const localUserName = localStorage.getItem("userName");
      if (localUserName) {
        setUserName(localUserName);
      }
    }
  }, [location.search]);

  useEffect(() => {
    const storedUserMajor = localStorage.getItem("major");
    if (storedUserMajor) {
      setUserMajor(storedUserMajor);
    }
  }, []);

  useEffect(() => {
    setRandomColleges(getRandomColleges(colleges, 7));
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
        major={userMajor}
        title3="멘토"
      />
      <div className="flex mt-[20px] overflow-auto">
        {Array.isArray(userData) &&
          userData.map((userData, index) => (
            <div key={index}>
              <MentorBox
                name={userData.nickname}
                major={userData.major}
                gen="woman"
                info="• 학생부종합전형 SW 우수인재
              • IT대학 및 글로벌미디어학부 관심 학생
              • SW특기자 입시 관심 학생"
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
            <div className="w-auto mt-[30px]">
              <Banner />
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
