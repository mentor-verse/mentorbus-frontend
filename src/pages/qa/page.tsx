import { useState, useRef, useEffect } from "react";
import { QuestionBox } from "@/components/ui/questionbox";
import { UnderArrowBlue } from "@/components/Icons/UnderArrowBlue";
import { FilterButton } from "@/components/Icons/FilterButton";
import { useNavigate } from "react-router-dom";
import { SearchIcon } from "@/components/Icons/MainIcons";

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
      question: "고2 1학기를 망했는데..",
      answer:
        "고1 1학기 때 3등급을 찍고, 2학기 때 2.4까지 올렸습니다. 근데 고2 1학기 때 너무 망해버려서 3.6까지 떨어져버렸어요...이거 남은 기간 동안 올리면 종합전형 쓸 수 있을까요? 아니면 정시로 갈아타야할까요?",
      star_num: 10,
      comment_num: 2,
      type: "best",
      major: "공학계열",
      userName: localStorage.getItem("userName") || "",
      position: "멘토",
      mentor_answer: "",
    },
    {
      question: "숭실대 컴퓨터학부 VS 숭실대 AI융합학부",
      answer:
        "AI가 재미있어서 AI융합학부를 지원할까 하는데, AI는 대학원을 가야한다 해서요. 취업이나 여러 비전을 고려했을 때 어느 학과를 가는 게 좋을까요? 각 학과의 차이는 정확히 무엇인가요?",
      star_num: 15,
      comment_num: 5,
      type: "best",
      major: "사회계열",
      userName: localStorage.getItem("userName") || "",
      position: "멘토",
      mentor_answer: "",
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
      )}&index=${encodeURIComponent(index)}`,
      {
        state: {
          question: box.question,
          answer: box.answer,
          star_num: box.star_num,
          comment_num: box.comment_num,
          mentor_answer: box.mentor_answer, // Pass mentor_answer here
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

              <div className="text-[16px] text-[#333333] font-medium mr-[20px] cursor-pointer">
                <SearchIcon />
              </div>
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

            {/*<BottomNav />*/}
          </div>
        </div>
      </div>
    </>
  );
}
