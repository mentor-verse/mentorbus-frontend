import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SearchBox } from "@/components/ui/searchbox";
import { FilterButton } from "@/components/Icons/FilterButton";
import { UnderArrowBlue } from "@/components/Icons/UnderArrowBlue";
import FindTitle from "./containers/FindTitle";
import { NotYetPage } from "./containers/NotYetPage";
import axios from "axios"; // Import axios

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

  // API에서 데이터를 불러오는 함수
  const loadClasses = async () => {
    try {
      const response = await axios.get(
        `https://port-0-mentorbus-backend-m0zjsul0a4243974.sel4.cloudtype.app/classes`
      );

      if (response.status === 200) {
        console.log("response", response);
        const classesFromApi = Array.isArray(response.data)
          ? response.data
          : [response.data];
        console.log("API response:", classesFromApi); // 데이터를 확인하는 로그
        setSearchBoxes(classesFromApi); // 데이터를 searchBoxes 상태에 저장
      } else {
        console.error(
          "API에서 가져온 데이터가 배열이 아닙니다:",
          response.data
        );
        setSearchBoxes([]); // 데이터가 배열이 아닐 경우 빈 배열로 설정
      }
    } catch (error) {
      console.error(
        "API로부터 데이터를 가져오는 중 오류가 발생했습니다:",
        error
      );
      setSearchBoxes([]); // 오류 발생 시 빈 배열로 설정
    } finally {
      setLoading(false); // 데이터 로드 완료 후 로딩 상태를 false로 설정
    }
  };

  useEffect(() => {
    loadClasses(); // 컴포넌트가 마운트될 때 API 호출
  }, []);

  useEffect(() => {
    if (school) {
      const decodedSchool = decodeURIComponent(school);
      setMainFilter("school");
      setSubFilter(decodedSchool);
    }
  }, [school]);

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

  if (loading) {
    return <div>Loading...</div>; // 로딩 상태일 때 표시할 내용
  }

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
            <div className="mt-[15px] grid place-content-center w-[95%]">
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
        </div>
      </div>
    </>
  );
}
