import { useState, useRef } from "react";
import { QuestionBox } from "@/components/ui/questionbox";
import BottomNav from "@/containers/navbar";
import { UnderArrowBlue } from "@/components/Icons/UnderArrowBlue";
import { FilterButton } from "@/components/Icons/FilterButton";

export function QAPage() {
  const [filter, setFilter] = useState("entry");
  const [subFilter, setSubFilter] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const growDivRef = useRef<HTMLDivElement>(null);
  const roadDivRef = useRef<HTMLDivElement>(null);

  const [searchBoxes, setSearchBoxes] = useState([
    {
      question: "고2 1학기를 망했는데..",
      answer:
        "고1 1학기 때 3등급을 찍고, 2학기 때 2.4까지 올렸습니다. 근데 고2 1학기 때 너무 망해버려서 3.6까지 떨어져버렸어요...이거 남은 기간 동안 올리면 종합전형 쓸 수 있을까요? 아니면 정시로 갈아타야할까요?",
      star_num: 1,
      comment_num: 1,
      type: "all",
      major: "공학계열",
    },
    {
      question: "숭실대 컴퓨터학부 VS 숭실대 AI융합학부",
      answer:
        "고1 1학기 때 3등급을 찍고, 2학기 때 2.4까지 올렸습니다. 근데 고2 1학기 때 너무 망해버려서 3.6까지 떨어져버렸어요...이거 남은 기간 동안 올리면 종합전형 쓸 수 있을까요? 아니면 정시로 갈아타야할까요?",
      star_num: 1,
      comment_num: 1,
      type: "all",
      major: "인문계열",
    },
    {
      question: "2.4 어문 교과",
      answer:
        "고1 1학기 때 3등급을 찍고, 2학기 때 2.4까지 올렸습니다. 근데 고2 1학기 때 너무 망해버려서 3.6까지 떨어져버렸어요...이거 남은 기간 동안 올리면 종합전형 쓸 수 있을까요? 아니면 정시로 갈아타야할까요?",
      star_num: 1,
      comment_num: 3,
      type: "all",
      major: "사회계열",
    },
    {
      question: "이과 내신 2.9가 지원했을 때 가능성 있는 공과계열 인서울 학과",
      answer:
        "고1 1학기 때 3등급을 찍고, 2학기 때 2.4까지 올렸습니다. 근데 고2 1학기 때 너무 망해버려서 3.6까지 떨어져버렸어요...이거 남은 기간 동안 올리면 종합전형 쓸 수 있을까요? 아니면 정시로 갈아타야할까요?",
      star_num: 1,
      comment_num: 3,
      type: "all",
      major: "교육계열",
    },
    {
      question: "컴공 생기부",
      answer:
        "고1 1학기 때 3등급을 찍고, 2학기 때 2.4까지 올렸습니다. 근데 고2 1학기 때 너무 망해버려서 3.6까지 떨어져버렸어요...이거 남은 기간 동안 올리면 종합전형 쓸 수 있을까요? 아니면 정시로 갈아타야할까요?",
      star_num: 1,
      comment_num: 2,
      type: "all",
      major: "자연계열",
    },
    {
      question: "정시 백분위 컷 좀 알려주세요ㅠㅠ",
      answer:
        "고1 1학기 때 3등급을 찍고, 2학기 때 2.4까지 올렸습니다. 근데 고2 1학기 때 너무 망해버려서 3.6까지 떨어져버렸어요...이거 남은 기간 동안 올리면 종합전형 쓸 수 있을까요? 아니면 정시로 갈아타야할까요?",
      star_num: 1,
      comment_num: 2,
      type: "all",
      major: "의학계열",
    },
  ]);

  const uniqueMajors = [...new Set(searchBoxes.map((box) => box.major))];

  const filteredBoxes = searchBoxes.filter((box) => {
    if (filter === "entry") {
      return subFilter ? box.major === subFilter : true;
    }
    if (filter === "applied") {
      return box.type === "best";
    }
    if (filter === "written") {
      return box.type === "my";
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
      return updatedBoxes;
    });
  };

  const handleSubFilterChange = (filter: string) => {
    setSubFilter(filter);
    setDropdownOpen(false);
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

            <div className="mt-[15px] grid place-items-center">
              {filteredBoxes.map((box, index) => (
                <div className="mt-[20px]" key={index}>
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
