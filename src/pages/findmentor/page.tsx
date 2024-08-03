import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SearchBox } from "@/components/ui/searchbox";
import { FilterButton } from "@/components/Icons/FilterButton";
import BottomNav from "@/containers/navbar";
import { UnderArrowBlue } from "@/components/Icons/UnderArrowBlue";
import FindTitle from "./containers/FindTitle";

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
  const [mainFilter, setMainFilter] = useState("all");
  const [subFilter, setSubFilter] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { school } = useParams(); // Extract school name from URL

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
      major: "[진로체험의 날] 글로벌미디어학부",
      name: "윤영재 멘토",
      info: "한양대학교",
      date: "2024.09.20(화) 18:00",
      text: "10/15",
      sort: "예술계열",
    },
    {
      gen: "man",
      major: "[진로체험의 날] 글로벌미디어학부",
      name: "윤영재 멘토",
      info: "서울대학교",
      date: "2024.10.20(화) 18:00",
      text: "9/12",
      sort: "예술계열",
    },
    {
      gen: "man",
      major: "[진로체험의 날] 글로벌미디어학부",
      name: "윤영재 멘토",
      info: "세종대학교",
      date: "2024.11.20(화) 18:00",
      text: "4/13",
      sort: "공학계열",
    },
    {
      gen: "man",
      major: "[진로체험의 날] 글로벌미디어학부",
      name: "윤영재 멘토",
      info: "중앙대학교",
      date: "2024.12.20(화) 18:00",
      text: "5/9",
      sort: "예술계열",
    },
    {
      gen: "man",
      major: "[진로체험의 날] 글로벌미디어학부",
      name: "윤영재 멘토",
      info: "경희대학교",
      date: "2025.01.20(화) 18:00",
      text: "3/4",
      sort: "예술계열",
    },
    {
      gen: "man",
      major: "[진로체험의 날] 글로벌미디어학부",
      name: "윤영재 멘토",
      info: "연세대학교",
      date: "2024.11.20(화) 18:00",
      text: "4/13",
      sort: "예술계열",
    },
    {
      gen: "man",
      major: "[진로체험의 날] 글로벌미디어학부",
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

  return (
    <>
      <div className="main">
        <div className="main_content">
          <div style={{ background: "#fff" }}>
            <FindTitle title="멘토버스" />

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

            <div className="mt-[20px] flex items-center relative ml-4">
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
            <div className="mt-[15px] grid place-items-center">
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
            <BottomNav />
          </div>
        </div>
      </div>
    </>
  );
}
