import { useState, useRef, useEffect } from "react";
import { QuestionBox } from "@/components/ui/questionbox";
import { UnderArrowBlue } from "@/components/Icons/UnderArrowBlue";
import { FilterButton } from "@/components/Icons/FilterButton";
import { useNavigate } from "react-router-dom";
import { SearchIcon } from "@/components/Icons/MainIcons";
import BottomNav from "@/containers/navbar";

interface QuestionBoxType {
  id: number;
  title: string;
  question: string;
  answer: string;
  star_num: number;
  comment_num: number;
  type: string;
  major: string;
  author: string;
  position: string;
  mentor_answer?: string;
  isClick: boolean;
}

export function QAPage() {
  const [filter, setFilter] = useState("entry");
  const [subFilter, setSubFilter] = useState<string>("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const growDivRef = useRef<HTMLDivElement>(null);
  const roadDivRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // State to hold questions fetched from the server
  const [searchBoxes, setSearchBoxes] = useState<QuestionBoxType[]>([]);

  // State for search functionality
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearchOpen, setIsSearchOpen] = useState(false); // Toggle search bar visibility

  // Fetch data from the server
  const getLetters = async () => {
    try {
      const response = await fetch(
        "https://port-0-mentorbus-backend-m0zjsul0a4243974.sel4.cloudtype.app/letters"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      const data = await response.json();

      if (Array.isArray(data)) {
        const formattedData = data.map((item) => ({
          ...item,
          isClick: item.isClick === "1",
        }));
        setSearchBoxes(formattedData);
      } else if (typeof data === "object" && data !== null) {
        const formattedData = [
          {
            ...data,
            isClick: data.isClick === "1",
          },
        ];
        setSearchBoxes(formattedData);
      } else {
        throw new Error("Unexpected data format");
      }

      console.log(data);
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    }
  };

  useEffect(() => {
    getLetters();
  }, [filter]);

  const uniqueMajors: string[] = [
    ...new Set(searchBoxes.map((box) => box.major)),
  ];
  const loggedInUserName = localStorage.getItem("userName") || "";

  const filteredBoxes = searchBoxes
    .filter((box) => {
      if (filter === "entry") {
        return subFilter ? box.major === subFilter : true;
      }
      if (filter === "applied") {
        return box.isClick === true;
      }
      if (filter === "written") {
        return box.author === loggedInUserName;
      }
      return false;
    })
    // Apply search query filter
    .filter(
      (box) =>
        searchQuery === "" ||
        box.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        box.question.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleStarClick = async (index: number) => {
    const updatedBoxes = [...searchBoxes];
    const box = updatedBoxes[index];

    try {
      const response = await fetch(
        `https://port-0-mentorbus-backend-m0zjsul0a4243974.sel4.cloudtype.app/letters/${box.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isClick: true }),
        }
      );

      const data = await response.json();
      console.log("서버 응답:", data);

      if (response.ok) {
        updatedBoxes[index].isClick = true;
        setSearchBoxes(updatedBoxes);
      } else {
        console.error("업데이트 실패", data.message);
      }
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  const handleSubFilterChange = (filter: string) => {
    setSubFilter(filter);
    setDropdownOpen(false);
  };

  const handleQuestionBoxClick = (box: QuestionBoxType, index: number) => {
    navigate(
      `/mentorbus-frontend/comment?userName=${encodeURIComponent(
        box.author
      )}&index=${encodeURIComponent(index)}`,
      {
        state: {
          question: box.question,
          title: box.title,
          star_num: box.star_num,
          comment_num: box.comment_num,
          mentor_answer: box.mentor_answer,
          position: box.position,
          idx: index,
        },
      }
    );
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
            <div className="flex items-center justify-between w-full text-lg not-italic font-bold text-[19px] mt-[20px]">
              <a className="ml-[20px]"></a>

              <div className="text-lg not-italic font-bold text-[19px] ml-[20px]">
                고민버스
              </div>

              <div
                className="text-[16px] text-[#333333] font-medium mr-[20px] cursor-pointer"
                onClick={() => setIsSearchOpen(!isSearchOpen)} // Toggle search bar
              >
                <SearchIcon />
              </div>
            </div>

            {/* Search Input Field */}
            {isSearchOpen && (
              <div className="mt-4 flex justify-center">
                <input
                  type="text"
                  placeholder="Search by title or question..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="p-2 border border-gray-300 rounded w-full max-w-md"
                />
              </div>
            )}

            <div className="flex justify-between mt-[40px]">
              <div
                className={`filter_btn_label ${
                  filter === "entry" ? "active" : ""
                }`}
                onClick={() => setFilter("entry")}
              >
                전체
              </div>
              <div
                className={`filter_btn_label ${
                  filter === "applied" ? "active" : ""
                }`}
                onClick={() => setFilter("applied")}
              >
                즐겨찾기
              </div>
              <div
                className={`filter_btn_label ${
                  filter === "written" ? "active" : ""
                }`}
                onClick={() => setFilter("written")}
              >
                작성글
              </div>
            </div>

            {filter === "entry" && (
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
                  <div className="dropdown absolute mt-[20px] bg-white border border-gray-300 rounded shadow-lg z-10 ml-[0px]">
                    {uniqueMajors.map((major, index) => (
                      <div
                        key={index}
                        className="dropdown_option p-[10px] hover:bg-gray-200 cursor-pointer"
                        onClick={() => handleSubFilterChange(major)}
                      >
                        {major}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="grid place-items-center">
              {filteredBoxes.map((box, index: number) => (
                <div
                  className="border-b-[0.6px] border-[#BABABA] w-full grid place-items-center py-6"
                  key={index}
                  onClick={() => handleQuestionBoxClick(box, index)}
                >
                  <QuestionBox
                    question={box.title}
                    answer={box.question}
                    star_num={box.star_num}
                    comment_num={box.comment_num}
                    className={box.type === "best" ? "best" : ""}
                    onStarClick={() => handleStarClick(index)}
                    star_color={box.isClick == true ? "#4E98EE" : "#fff"}
                  />
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
