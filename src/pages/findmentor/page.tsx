import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SearchBox } from "@/components/ui/searchbox";
import { FilterButton } from "@/components/Icons/FilterButton";
import BottomNav from "@/containers/navbar";
import { UnderArrowBlue } from "@/components/Icons/UnderArrowBlue";
import FindTitle from "./containers/FindTitle";
import { NotYetPage } from "./containers/NotYetPage"; // Import NotYetPage

type SearchBoxType = {
  gen: string;
  major: string;
  name: string;
  info: string;
  date: string;
  text: string;
  sort: string;
};

export function FindMentor() {
  // Check if the 'position' in localStorage is '멘토'
  const position = localStorage.getItem("position");

  if (position === "멘토") {
    return <NotYetPage />; // Render NotYetPage if the position is '멘토'
  }

  const [mainFilter, setMainFilter] = useState("all");
  const [subFilter, setSubFilter] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { school } = useParams(); // Extract school name from URL
  const growDivRef = useRef<HTMLDivElement>(null);
  const roadDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (school) {
      const decodedSchool = decodeURIComponent(school); // Decode the URL-encoded school name
      setMainFilter("school");
      setSubFilter(decodedSchool);
    }
  }, [school]);

  const searchBoxes: SearchBoxType[] = [
    {
      gen: "man",
      major: "[진로체험의 날] 글로벌미디어학부",
      name: "윤영재 멘토",
      info: "숭실대학교",
      date: "2024.08.20(화) 18:00",
      text: "4/5",
      sort: "인문계열",
    },
    {
      gen: "man",
      major: "[진로체험의 날] 소프트웨어학부",
      name: "윤영재 멘토",
      info: "한양대학교",
      date: "2024.09.20(화) 18:00",
      text: "10/15",
      sort: "예술계열",
    },
    {
      gen: "man",
      major: "[진로체험의 날] 경영학부",
      name: "윤영재 멘토",
      info: "서울대학교",
      date: "2024.10.20(화) 18:00",
      text: "9/12",
      sort: "예술계열",
    },
    {
      gen: "man",
      major: "[진로체험의 날] 스포츠학부",
      name: "윤영재 멘토",
      info: "세종대학교",
      date: "2024.11.20(화) 18:00",
      text: "4/13",
      sort: "공학계열",
    },
    {
      gen: "man",
      major: "[진로체험의 날] AI학부",
      name: "윤영재 멘토",
      info: "중앙대학교",
      date: "2024.12.20(화) 18:00",
      text: "5/9",
      sort: "예술계열",
    },
    {
      gen: "man",
      major: "[진로체험의 날] 통상무역학부",
      name: "윤영재 멘토",
      info: "경희대학교",
      date: "2025.01.20(화) 18:00",
      text: "3/4",
      sort: "예술계열",
    },
    {
      gen: "man",
      major: "[진로체험의 날] 국어국문학부",
      name: "윤영재 멘토",
      info: "연세대학교",
      date: "2024.11.20(화) 18:00",
      text: "4/13",
      sort: "예술계열",
    },
    {
      gen: "man",
      major: "[진로체험의 날] 불어불문학부",
      name: "윤영재 멘토",
      info: "서울시립대학교",
      date: "2024.11.20(화) 18:00",
      text: "4/13",
      sort: "예술계열",
    },
  ];
  const uniqueTypes = [...new Set(searchBoxes.map((box) => box.sort))];
  const uniqueInfos = [...new Set(searchBoxes.map((box) => box.info))];

  const filteredBoxes = searchBoxes.filter((box) => {
    if (mainFilter === "all") {
      return subFilter ? box.sort === subFilter : true;
    } else if (mainFilter === "school") {
      return subFilter ? box.info === subFilter : true;
    }
    return true;
  });

  const handleMainFilterChange = (filter: string) => {
    setMainFilter(filter);
    setSubFilter("");
    setDropdownOpen(false);
  };

  const handleSubFilterChange = (filter: string) => {
    setSubFilter(filter);
    setDropdownOpen(false);
  };

  const handleSearchBoxClick = (box: SearchBoxType) => {
    navigate("/mentorbus-frontend/mentorinfo", { state: { selectedBox: box } });
  };

  useEffect(() => {
    const handleResize = () => {
      if (growDivRef.current && roadDivRef.current) {
        const viewportHeight = window.innerHeight;
        const renderedComponentElement = document.querySelector(
          ".rendered-component"
        ) as HTMLElement;
        const renderedComponentHeight =
          renderedComponentElement?.clientHeight || 0;
        const roadDivHeight = roadDivRef.current?.clientHeight || 0;
        growDivRef.current.style.height = `${
          viewportHeight - renderedComponentHeight - roadDivHeight
        }px`;
        growDivRef.current.style.background = "white";
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="main">
        <div className="main_content">
          <div style={{ background: "#fff" }}>
            <FindTitle
              title="멘토찾기"
              Link={""}
              back_disable={"no"}
              back_work={"no"}
            />

            <div className="flex justify-between mt-[40px]">
              <div
                className={`filter_btn_label ${
                  mainFilter === "all" ? "active" : ""
                }`}
                onClick={() => handleMainFilterChange("all")}
              >
                전체 멘토 목록
              </div>
              <div
                className={`filter_btn_label ${
                  mainFilter === "school" ? "active" : ""
                }`}
                onClick={() => handleMainFilterChange("school")}
              >
                학교별 멘토링
              </div>
            </div>

            <div
              ref={roadDivRef}
              className="mt-[20px] flex items-center relative ml-4"
            >
              <button onClick={() => setDropdownOpen(!dropdownOpen)}>
                <FilterButton />
              </button>
              {subFilter && (
                <div
                  className="flex items-center ml-[10px] bg-blue-100 px-[10px] py-[5px] rounded cursor-pointer text-[#47A5D9] text-[13px]"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  {subFilter} &nbsp; <UnderArrowBlue />
                </div>
              )}
              {dropdownOpen && (
                <div className="dropdown absolute mt-[300px] bg-white border border-gray-300 rounded shadow-lg z-10 ml-[0px]">
                  {mainFilter === "all" &&
                    uniqueTypes.map((sort, index) => (
                      <div
                        key={index}
                        className="dropdown_option p-[10px] hover:bg-gray-200 cursor-pointer"
                        onClick={() => handleSubFilterChange(sort)}
                      >
                        {sort}
                      </div>
                    ))}
                  {mainFilter === "school" &&
                    uniqueInfos.map((info, index) => (
                      <div
                        key={index}
                        className="dropdown_option p-[10px] hover:bg-gray-200 cursor-pointer"
                        onClick={() => handleSubFilterChange(info)}
                      >
                        {info}
                      </div>
                    ))}
                </div>
              )}
            </div>
            <div className="mt-[15px] grid place-items-center w-[95%]">
              {filteredBoxes.map((box, index) => (
                <div
                  onClick={() => handleSearchBoxClick(box)}
                  className="mt-[20px]"
                  key={index}
                >
                  <SearchBox
                    gen={box.gen}
                    major={box.major}
                    name={box.name}
                    info={box.info}
                    date={box.date}
                    variant="state"
                    size="state"
                    onClick={() => handleSearchBoxClick(box)} // Add onClick handler
                    sort=""
                  >
                    {box.text}
                  </SearchBox>
                </div>
              ))}
            </div>

            <div ref={growDivRef}></div>

            <BottomNav />
          </div>
        </div>
      </div>
    </>
  );
}
