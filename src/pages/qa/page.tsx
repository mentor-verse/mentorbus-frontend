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
  major: string;
  userName: string;
  position: string; // Add position to the type
  mentor_answer?: string;
}

export function QAPage() {
  const [filter, setFilter] = useState("entry");
  const [subFilter, setSubFilter] = useState<string>("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const growDivRef = useRef<HTMLDivElement>(null);
  const roadDivRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const exampleQuestions: QuestionBoxType[] = [
    {
      question: "What is the best way to learn React?",
      answer:
        "Start with the official documentation, then build small projects.",
      star_num: 10,
      comment_num: 2,
      type: "best",
      major: "Computer Science",
      userName: "mentorUser1",
      position: "멘토",
    },
    {
      question: "How do I prepare for technical interviews?",
      answer: "Practice with coding challenges and mock interviews.",
      star_num: 15,
      comment_num: 5,
      type: "best",
      major: "Software Engineering",
      userName: "mentorUser2",
      position: "멘토",
    },
  ];

  const [searchBoxes, setSearchBoxes] = useState<QuestionBoxType[]>(() => {
    const savedQuestions = JSON.parse(
      localStorage.getItem("questions") || "[]"
    );
    return savedQuestions;
  });

  // Ensure example questions are saved to localStorage if not already present
  useEffect(() => {
    const savedQuestions = JSON.parse(
      localStorage.getItem("questions") || "[]"
    ) as QuestionBoxType[];

    const updatedQuestions = [...savedQuestions];

    exampleQuestions.forEach((exampleQuestion) => {
      const exists = savedQuestions.some(
        (question) => question.question === exampleQuestion.question
      );

      if (!exists) {
        updatedQuestions.push(exampleQuestion);
      }
    });

    setSearchBoxes(updatedQuestions);
    localStorage.setItem("questions", JSON.stringify(updatedQuestions));
  }, []);

  const uniqueMajors: string[] = [
    ...new Set(searchBoxes.map((box) => box.major)),
  ];
  const loggedInUserName = localStorage.getItem("userName") || "";

  const filteredBoxes = searchBoxes.filter((box) => {
    if (filter === "entry") {
      return subFilter ? box.major === subFilter : true;
    }
    if (filter === "applied") {
      return box.type === "best";
    }
    if (filter === "written") {
      return box.userName === loggedInUserName;
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
              고민버스
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
              {filteredBoxes.map((box, index: number) => (
                <div
                  className="border-b-[0.6px] border-[#BABABA] w-full grid place-items-center py-6"
                  key={index}
                  onClick={() => handleQuestionBoxClick(box, index)}
                >
                  <QuestionBox
                    question={box.question}
                    answer={box.answer}
                    star_num={box.star_num}
                    comment_num={box.comment_num}
                    className={box.type === "best" ? "best" : ""}
                    onStarClick={(starred) => handleStarClick(index, starred)}
                  />
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
