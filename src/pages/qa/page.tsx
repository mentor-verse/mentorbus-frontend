import { useState, useRef, useEffect } from "react";
import { QuestionBox } from "@/components/ui/questionbox";
import BottomNav from "@/containers/navbar";
import { UnderArrowBlue } from "@/components/Icons/UnderArrowBlue";
import { FilterButton } from "@/components/Icons/FilterButton";
import { useNavigate } from "react-router-dom";

// Define the type for the question boxes
interface QuestionBoxType {
  question: string;
  answer: string;
  star_num: number;
  comment_num: number;
  type: string;
  major: string; // Add major to the type
  userName: string; // Add userName to the type
  mentor_answer?: string; // Optional field for mentor_answer
}

export function QAPage() {
  const [filter, setFilter] = useState("entry");
  const [subFilter, setSubFilter] = useState<string>("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const growDivRef = useRef<HTMLDivElement>(null);
  const roadDivRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Use the defined type for searchBoxes
  const [searchBoxes, setSearchBoxes] = useState<QuestionBoxType[]>(() => {
    const savedQuestions = JSON.parse(
      localStorage.getItem("questions") || "[]"
    );
    return savedQuestions;
  });

  // Specify uniqueMajors with type string[]
  const uniqueMajors: string[] = [
    ...new Set(searchBoxes.map((box) => box.major)),
  ];
  const loggedInUserName = localStorage.getItem("userName") || ""; // Retrieve the logged-in userName

  const filteredBoxes = searchBoxes.filter((box) => {
    if (filter === "entry") {
      return subFilter ? box.major === subFilter : true;
    }
    if (filter === "applied") {
      return box.type === "best";
    }
    if (filter === "written") {
      return box.userName === loggedInUserName; // Filter based on the logged-in user's name
    }
    return false;
  });

  const handleStarClick = (index: number, starred: boolean) => {
    setSearchBoxes((prevBoxes) => {
      const updatedBoxes = [...prevBoxes];
      const box = updatedBoxes[index];
      if (starred) {
        box.star_num += 1;
        if (box.star_num > 1) {
          box.type = "best";
        }
      } else {
        box.star_num -= 1;
        if (box.star_num <= 1) {
          box.type = "all";
        }
      }
      localStorage.setItem("questions", JSON.stringify(updatedBoxes));
      return updatedBoxes;
    });
  };

  const handleSubFilterChange = (filter: string) => {
    setSubFilter(filter);
    setDropdownOpen(false);
  };

  const handleQuestionBoxClick = (box: QuestionBoxType, index: number) => {
    navigate(
      `/mentorbus-frontend/comment?userName=${encodeURIComponent(
        box.userName
      )}&userQuestion=${encodeURIComponent(box.question)}`,
      {
        state: {
          answer: box.answer,
          question: box.question,
          star_num: box.star_num,
          comment_num: box.comment_num,
          index,
          mentor_answer: box.mentor_answer,
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
            <div className="text-lg not-italic font-bold text-[19px] mt-[20px]">
              멘토버스
            </div>
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
              {filteredBoxes.map(
                (
                  box,
                  index: number // Ensure index is typed as number
                ) => (
                  <div
                    className="border-b-[0.6px] border-[#BABABA] w-full grid place-items-center py-6"
                    key={index}
                    onClick={() => handleQuestionBoxClick(box, index)} // Convert Key to number
                  >
                    <QuestionBox
                      question={box.question}
                      answer={box.answer}
                      star_num={box.star_num}
                      comment_num={box.comment_num}
                      className={box.type === "best" ? "best" : ""}
                      onStarClick={(starred) => handleStarClick(index, starred)} // Convert Key to number
                    />
                  </div>
                )
              )}
            </div>

            <div ref={growDivRef}></div>

            <BottomNav />
          </div>
        </div>
      </div>
    </>
  );
}
