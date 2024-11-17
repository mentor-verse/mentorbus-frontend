import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SearchBox } from "@/components/ui/searchbox";

import { FilterButton } from "@/components/Icons/FilterButton";
import { UnderArrowBlue } from "@/components/Icons/UnderArrowBlue";

import { NotYetPage } from "./containers/NotYetPage";
import axios from "axios"; // Import axios
import BottomNav from "@/containers/navbar";
import { SearchIcon } from "@/components/Icons/MainIcons";

type SearchBoxType = {
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
export function FindMentor() {
  const position = localStorage.getItem("position");

  if (position === "멘토") {
    return <NotYetPage />;
  }

  const [mainFilter, setMainFilter] = useState("all");
  const [subFilter, setSubFilter] = useState("");

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [searchBoxes, setSearchBoxes] = useState<SearchBoxType[]>([]); // API에서 불러온 데이터를 저장할 state
  const [loading, setLoading] = useState(true); // 로딩 상태
  const navigate = useNavigate();
  const { school } = useParams();
  const growDivRef = useRef<HTMLDivElement>(null);
  const roadDivRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState<string>(""); // Search query state
  const [isSearchOpen, setIsSearchOpen] = useState(false); // To toggle search bar visibility

  // API에서 전체 데이터를 불러오는 함수
  const loadClasses = async () => {
    try {
      const response = await axios.get(
        `https://port-0-mentorbus-backend-m0zjsul0a4243974.sel4.cloudtype.app/class/open`
      );

      if (response.status === 200) {
        console.log("response", response);
        const classesFromApi = Array.isArray(response.data)
          ? response.data
          : [response.data];
        setSearchBoxes(classesFromApi); // 데이터를 searchBoxes 상태에 저장
        console.log("searchBoxes", searchBoxes);
      } else {
        setSearchBoxes([]); // 데이터가 배열이 아닐 경우 빈 배열로 설정
      }
    } catch (error) {
      setSearchBoxes([]); // 오류 발생 시 빈 배열로 설정
    } finally {
      setLoading(false); // 데이터 로드 완료 후 로딩 상태를 false로 설정
    }
  };

  // API에서 특정 학교 데이터를 불러오는 함수
  {
    /*
  const loadSpecificClasses = async (major: string) => {
    try {
      const response = await axios.get(
        `https://port-0-mentorbus-backend-m0zjsul0a4243974.sel4.cloudtype.app/class/open/${major}`
      );

      if (response.status === 200) {
        console.log("response", response);

        const classesFromApi = Array.isArray(response.data)
          ? response.data
          : [response.data];
        setSearchBoxes(classesFromApi); // 데이터를 searchBoxes 상태에 저장
      } else {
        setSearchBoxes([]); // 데이터가 배열이 아닐 경우 빈 배열로 설정
      }
    } catch (error) {
      setSearchBoxes([]); // 오류 발생 시 빈 배열로 설정
    } finally {
      setLoading(false); // 데이터 로드 완료 후 로딩 상태를 false로 설정
    }
  };
  */
  }

  // school params를 확인해 subFilter로 설정
  useEffect(() => {
    if (school) {
      const decodedSchool = decodeURIComponent(school);
      setMainFilter("school");
      setSubFilter(decodedSchool);
    }
  }, [school]);

  // mainFilter와 subFilter가 변경될 때마다 적절한 데이터를 로드
  useEffect(() => {
    if (mainFilter === "all") {
      loadClasses();
    } else if (mainFilter === "school" && subFilter) {
      loadClasses(); // subFilter (info 값)으로 loadSpecificClasses 호출
    }
  }, [mainFilter, subFilter]); // subFilter 값이 변경될 때마다 호출

  // Add filter for search query in addition to mainFilter and subFilter
  const filteredBoxes = searchBoxes
    .filter((box) => {
      if (mainFilter === "all") {
        return subFilter ? box.sort === subFilter : true;
      } else if (mainFilter === "school") {
        return subFilter ? box.major === subFilter : true;
      }
      return true;
    })
    .filter(
      (box) =>
        searchQuery === "" ||
        box.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        box.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        box.major.toLowerCase().includes(searchQuery.toLowerCase())
    );

  console.log("filteredBoxes", filteredBoxes);

  const handleMainFilterChange = (filter: string) => {
    setMainFilter(filter);
    setSubFilter("");
    {
      setDropdownOpen(false);
    }
  };

  const handleSubFilterChange = (filter: string) => {
    setSubFilter(filter); // subFilter 값에 info 값을 설정
    setDropdownOpen(false);
  };

  const handleSearchBoxClick = (box: SearchBoxType) => {
    navigate("/mentorinfo", { state: { selectedBox: box } });
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

  if (loading) {
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
    ); // 로딩 상태일 때 표시할 내용
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks

  return (
    <>
      <div className="main" style={{ background: "#fff" }}>
        <div className="main_content">
          <div style={{ background: "#fff" }}>
            <div className="flex justify-center text-lg not-italic font-bold text-[19px] mt-[20px] items-center align-middle  w-full ">
              <a className="mr-auto ml-3"></a>

              <div className="w-30 pl-8">멘토찾기</div>

              <div
                className="text-[16px] items-center align-middle text-[#333333] font-medium ml-auto mr-3 cursor-pointer"
                onClick={() => setIsSearchOpen(!isSearchOpen)} // Toggle search bar
              >
                <SearchIcon />
              </div>
            </div>

            {isSearchOpen && (
              <div className="mt-4 flex justify-center">
                <input
                  type="text"
                  placeholder="원하는 멘토링을 검색해보세요"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={(e) => (e.target.style.border = "none")} // 클릭 시 border 비활성화
                  onBlur={(e) => (e.target.style.border = "1px solid #D1D5DB")} // 포커스 해제 시 원래 border로 복구
                  className="p-2 border border-gray-300  w-[90%] max-w-md rounded-lg "
                />
              </div>
            )}

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
                    [...new Set(searchBoxes.map((box) => box.sort))].map(
                      (sort, index) => (
                        <div
                          key={index}
                          className="dropdown_option p-[10px] hover:bg-gray-200 cursor-pointer"
                          onClick={() => handleSubFilterChange(sort)}
                        >
                          {sort}
                        </div>
                      )
                    )}
                  {mainFilter === "school" &&
                    [...new Set(searchBoxes.map((box) => box.major))].map(
                      (major, index) => (
                        <div
                          key={index}
                          className="dropdown_option p-[10px] hover:bg-gray-200 cursor-pointer"
                          onClick={() => handleSubFilterChange(major)}
                        >
                          {major}
                        </div>
                      )
                    )}
                </div>
              )}
            </div>
            <div className="mt-[5px] grid place-content-center w-[95%]">
              {filteredBoxes.map((box, index) => (
                <div
                  onClick={() => handleSearchBoxClick(box)}
                  className="mt-[20px]"
                  key={index}
                >
                  <SearchBox
                    gen={box.gen}
                    major={box.title}
                    name={box.name}
                    info={box.major}
                    date={box.date}
                    variant="num"
                    size="state"
                    onClick={() => handleSearchBoxClick(box)}
                    sort=""
                  >
                    {box.num}/35
                  </SearchBox>
                </div>
              ))}
            </div>

            <div ref={growDivRef}></div>
          </div>
          <BottomNav />
        </div>
      </div>
    </>
  );
}
