import { useState, useRef, useEffect } from "react";
import { QuestionBox } from "@/components/ui/questionbox";
import { UnderArrowBlue } from "@/components/Icons/UnderArrowBlue";
import { FilterButton } from "@/components/Icons/FilterButton";
import { useNavigate } from "react-router-dom";
import { SearchIcon } from "@/components/Icons/MainIcons";
import BottomNav from "@/containers/navbar";
import { useGetQuestion } from "@/hooks/useGetQuestion";
import { useQueryClient } from "@tanstack/react-query";
import { usePostQuestionLikes } from "@/hooks/usePostQuestionLikes";
import { useGetQaCount } from "@/hooks/useGetQaCount";
import { getQaCountRes, getQuestionLikeRes, getQuestionRes } from "@/types/get";
import { useDelQuestionUnlike } from "@/hooks/useDelQuestionUnlike";
import { useGetQuestionLike } from "@/hooks/useGetQuestionLike";

export function QAPage() {
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

  const [filter, setFilter] = useState("entry");
  const [subFilter, setSubFilter] = useState<string>("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const growDivRef = useRef<HTMLDivElement>(null);
  const roadDivRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const [q, setSearchQuery] = useState<string>("");
  const [isSearchOpen, setIsSearchOpen] = useState(false); // Toggle search bar visibility

  const [questionData, setQuestionData] = useState<getQuestionRes[]>([]);
  const [qCount, setQCount] = useState<getQaCountRes[]>([]);
  const [qLike, setQLike] = useState<getQuestionLikeRes[]>([]);

  const [tempQuery, setTempQuery] = useState<string>("");
  const [favoriteStates, setFavoriteStates] = useState<Record<number, boolean>>(
    {}
  );

  console.log("qCount", qCount);
  const category = "IT계열";

  const {
    data: resp,
    isLoading,
    isError,
    refetch,
  } = useGetQuestion({ q, category });

  const questionIds = questionData.map((item) => item.id);

  const {
    data: respCount,
    isLoading: isLoadingCount,
    isError: isErrorCount,
    refetch: refetchCount,
  } = useGetQaCount({ questionId: questionIds });

  const userId = 1234;
  const {
    data: respQLike,
    isLoading: isLoadingQLike,
    isError: isErrorQLike,
    refetch: refetchQLike,
  } = useGetQuestionLike({ userId });

  useEffect(() => {
    if (respQLike && Array.isArray(respQLike)) {
      const initialFavorites: Record<number, boolean> = {};
      respQLike.forEach((like: { questionId: number }) => {
        initialFavorites[like.questionId] = true;
      });
      setFavoriteStates(initialFavorites);
    }
  }, [respQLike]);

  const { mutateAsync: setLike } = usePostQuestionLikes();
  const { mutate } = useDelQuestionUnlike();

  useEffect(() => {
    if (respCount) {
      setQCount(Array.isArray(respCount) ? respCount : [respCount]);
      console.log("respCount", respCount);
    }
  }, [respCount]);

  useEffect(() => {
    if (respQLike) {
      setQLike(Array.isArray(respQLike) ? respQLike : [respQLike]);
      console.log("respQLike", respQLike);
    }
  }, [respQLike]);

  useEffect(() => {
    if (resp) {
      setQuestionData(Array.isArray(resp) ? resp : [resp]);
      console.log("resp", resp);
    }
  }, [resp]);

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchQuery(tempQuery);
    }
  };

  useEffect(() => {
    if (!queryClient.getQueryData(["getQaCount"])) {
      refetchCount();
    }
  }, [queryClient, refetchCount]);

  useEffect(() => {
    if (!queryClient.getQueryData(["getQuestion"])) {
      refetch();
    }
  }, [queryClient, refetch]);

  useEffect(() => {
    if (!queryClient.getQueryData(["getQuestionLike"])) {
      refetchQLike();
    }
  }, [queryClient, refetchQLike]);

  const uniqueMajors: string[] = [
    ...new Set(questionData.map((box) => box.major)),
  ];

  const filteredBoxes = questionData
    .filter((box) => box)
    .filter((box) => {
      if (filter === "entry") {
        return subFilter ? box.major === subFilter : true;
      }
      if (filter === "applied") {
        // qLike에 포함된 questionId가 box.id와 일치하는지 확인
        return qLike.some((like) => like.questionId === box.id);
      }
      if (filter === "written") {
        // localStorage의 userId와 box의 userId가 일치하는지 확인
        const loggedInUserId = localStorage.getItem("userId");
        return box.userId?.toString() === loggedInUserId;
      }
      return false;
    })
    .filter(
      (box) =>
        q === "" ||
        box.title?.toLowerCase().includes(q.toLowerCase()) ||
        box.question?.toLowerCase().includes(q.toLowerCase())
    );

  const handleLikeClick = async (box: QuestionBoxType) => {
    if (!box || !box.id) {
      console.error("Box is undefined or missing ID");
      return;
    }

    const isFavorited = favoriteStates[box.id] ?? box.isClick;

    try {
      if (!isFavorited) {
        await setLike({
          userId: 1234,
          questionId: box.id,
        });

        window.location.reload();
      } else {
        await mutate({
          userId: 1234,
          questionId: box.id,
        });

        window.location.reload(); // 로딩 속도 개선
      }
      setFavoriteStates((prev) => ({
        ...prev,
        [box.id]: !isFavorited,
      }));
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  const handleQuestionBoxClick = (box: QuestionBoxType, index: number) => {
    navigate(`/comment?questionId=${encodeURIComponent(box.id)}`, {
      state: {
        question: box.question,
        title: box.title,
        star_num: box.star_num,
        comment_num: box.comment_num,
        mentor_answer: box.mentor_answer,
        position: localStorage.getItem("position"),
        idx: index,
      },
    });
  };

  const handleSubFilterChange = (major: string) => {
    setSubFilter(major);
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

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading articles</p>;

  if (isLoadingCount) return <p>Loading...</p>;
  if (isErrorCount) return <p>Error loading articles</p>;

  if (isLoadingQLike) return <p>Loading...</p>;
  if (isErrorQLike) return <p>Error loading articles</p>;

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

            {isSearchOpen && (
              <div className="mt-4 flex justify-center">
                <input
                  type="text"
                  placeholder="궁금한 고민을 검색해보세요"
                  value={tempQuery}
                  onChange={(e) => setTempQuery(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                  onFocus={(e) => (e.target.style.border = "none")}
                  onBlur={(e) => (e.target.style.border = "1px solid #D1D5DB")}
                  className="p-2 border border-gray-300 w-[90%] max-w-md rounded-lg"
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
              {filteredBoxes.map((box, index: number) => {
                if (!box) return null;

                const questionCountData = Array.isArray(respCount)
                  ? respCount.find(
                      (item) => item.question === box.id.toString()
                    )
                  : { likeCount: 0, commentCount: 0 };

                const formattedBox: QuestionBoxType = {
                  id: box.id,
                  title: box.title,
                  question: box.question,
                  answer: box.answer ?? "",
                  star_num: questionCountData?.likeCount ?? 0,
                  comment_num: questionCountData?.commentCount ?? 0,
                  type: box.type,
                  major: box.major,
                  author: box.author ?? "Unknown",
                  position: box.position ?? "Unknown",
                  mentor_answer: box.mentor_answer,
                  isClick: favoriteStates[box.id] ?? false,
                };

                return (
                  <div
                    className="border-b-[0.6px] border-[#BABABA] w-full grid place-items-center py-6"
                    key={index}
                    onClick={() => handleQuestionBoxClick(formattedBox, index)}
                  >
                    <QuestionBox
                      question={formattedBox.title}
                      answer={formattedBox.answer}
                      star_num={formattedBox.star_num}
                      comment_num={formattedBox.comment_num}
                      className={formattedBox.type === "best" ? "best" : ""}
                      onStarClick={() => handleLikeClick(formattedBox)}
                      star_color={formattedBox.isClick ? "#4E98EE" : "#fff"}
                    />
                  </div>
                );
              })}
            </div>

            <div ref={growDivRef}></div>
          </div>
          <BottomNav />
        </div>
      </div>
    </>
  );
}
