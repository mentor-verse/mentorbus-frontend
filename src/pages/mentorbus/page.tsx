import { useState, useEffect, useRef } from "react";
import { SearchBox } from "@/components/ui/searchbox";
import BottomNav from "@/containers/navbar";
import { Info } from "@/components/ui/info";
import { useNavigate } from "react-router-dom";

declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage: (message: string) => void;
    };
  }
}

interface SelectedBox {
  gen: string;
  major: string;
  name: string;
  info: string;
  date: string;
  sort: string;
  status: "pending" | "completed";
}

// Fetch the position value from localStorage
const position = localStorage.getItem("position");

// Common type and interface declarations
type SortType = "인문계열" | "예술계열" | "IT계열" | "공학계열";

// Common function to check SortType
function isSortType(value: any): value is SortType {
  return ["인문계열", "예술계열", "IT계열", "공학계열"].includes(value);
}

const gatherTownUrls: Record<SortType, string> = {
  인문계열: "nJCm-X-RR5OojtQzylwy",
  예술계열: "5RvF4SJkTl6csexWVxQw",
  IT계열: "PsbK1kvsSF2vqKIf-VLj",
  공학계열: "nWPWj7r6T8eRB2mVaUT8",
};
// Declare function variable for isSelectedBox
let isSelectedBox: (item: any) => item is SelectedBox;

if (position === "멘티") {
  isSelectedBox = function (item: any): item is SelectedBox {
    return (
      typeof item.gen === "string" &&
      typeof item.major === "string" &&
      typeof item.name === "string" &&
      typeof item.info === "string" &&
      typeof item.date === "string" &&
      isSortType(item.sort) &&
      (item.status === "pending" || item.status === "completed")
    );
  };
} else if (position === "멘토") {
  isSelectedBox = function (item: any): item is SelectedBox {
    return (
      typeof item.gen === "string" &&
      typeof item.major === "string" &&
      typeof item.name === "string" &&
      typeof item.info === "string" &&
      typeof item.date === "string" &&
      typeof item.sort === "string" &&
      (item.status === "pending" || item.status === "completed")
    );
  };
} else {
  // Default case when position is not available
  isSelectedBox = function (item: any): item is SelectedBox {
    return (
      typeof item.gen === "string" &&
      typeof item.major === "string" &&
      typeof item.name === "string" &&
      typeof item.info === "string" &&
      typeof item.date === "string" &&
      isSortType(item.sort) &&
      (item.status === "pending" || item.status === "completed")
    );
  };
}

// 멘티용 컴포넌트
export function MentorBusPageMentee() {
  const [filter, setFilter] = useState("entry");
  const [appliedItems, setAppliedItems] = useState<SelectedBox[]>([]); // 초기 상태 빈 배열로 설정
  const growDivRef = useRef<HTMLDivElement>(null);
  const roadDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const itemsFromStorage = JSON.parse(
      localStorage.getItem("appliedItems") || "[]"
    );

    if (Array.isArray(itemsFromStorage)) {
      const parsedItems: SelectedBox[] = itemsFromStorage
        .map((item: any) => ({
          ...item,
          status: item.status === "completed" ? "completed" : "pending",
        }))
        .filter((item) => isSelectedBox(item));

      setAppliedItems(parsedItems);
    } else {
      console.error("appliedItems is not an array:", itemsFromStorage);
      setAppliedItems([]);
    }
  }, []); // 빈 배열을 두어 컴포넌트 마운트 시 한 번만 실행되도록 설정

  const handleEnter = (item: SelectedBox) => {
    if (isSortType(item.sort)) {
      const url = `https://app.gather.town/invite?token=${
        gatherTownUrls[item.sort]
      }`;
      console.log("Generated URL: ", url);

      if (window.ReactNativeWebView) {
        console.log("Posting message to React Native WebView");
        window.ReactNativeWebView.postMessage(JSON.stringify({ url }));
      } else {
        console.log("Opening URL in a new tab");
        window.open(url, "_blank");
      }

      const updatedItems = appliedItems.map((i) =>
        i === item ? { ...i, status: "completed" } : i
      );
      setAppliedItems(updatedItems as SelectedBox[]);
      localStorage.setItem(
        "appliedItems",
        JSON.stringify(
          updatedItems.map((i) => ({
            ...i,
            status: i.status === "completed" ? "completed" : "pending",
          }))
        )
      );
      setFilter("applied");
    }
  };

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
                진행예정
              </div>
              <div
                className={`filter_btn_label ${
                  filter === "applied" ? "active" : ""
                }`}
                onClick={() => setFilter("applied")}
              >
                진행완료
              </div>
            </div>

            <div className="grid place-items-center mt-3">
              <Info
                Info={
                  "멘토는 자유롭게 수업 입장 가능하며, 멘티들은 수업 시작 10분 전부터 입장이 가능합니다."
                }
              />
            </div>

            <div ref={roadDivRef} className="grid place-items-center">
              {appliedItems
                .filter((item) =>
                  filter === "entry"
                    ? item.status === "pending"
                    : item.status === "completed"
                )
                .map((item, index) => (
                  <div
                    key={index}
                    className="grid place-items-center mt-[0px] h-[120px]"
                  >
                    <SearchBox
                      gen={item.gen}
                      major={item.major}
                      name={item.name}
                      info={item.info}
                      date={item.date}
                      sort={item.sort}
                      variant="default"
                      size="default"
                      onClick={
                        filter === "entry" ? () => handleEnter(item) : () => {}
                      }
                    >
                      {filter === "entry" ? "입장하기" : "진행완료"}
                    </SearchBox>
                  </div>
                ))}
            </div>
          </div>

          <div ref={growDivRef}></div>

          <BottomNav />
        </div>
      </div>
    </>
  );
}

export function MentorBusPageMentor() {
  const [filter, setFilter] = useState("entry");
  const [appliedItems, setAppliedItems] = useState<SelectedBox[]>([]);
  const growDivRef = useRef<HTMLDivElement>(null);
  const roadDivRef = useRef<HTMLDivElement>(null);
  const [classDataArray, setClassDataArray] = useState<
    { title: string; content: string; date: string; gatherUrl: string }[]
  >([]);

  const name = localStorage.getItem("userName") || "";
  const major = localStorage.getItem("major") || "";

  const navigate = useNavigate(); // useNavigate 사용

  const handleEnter = (item: SelectedBox, classData: any) => {
    console.log(
      "handleEnter called with item:",
      item,
      "and classData:",
      classData
    );

    // classData.gatherUrl이 유효한지 확인
    if (classData.gatherUrl) {
      const url = `https://app.gather.town/invite?token=${classData.gatherUrl}`;
      console.log("Generated URL: ", url);

      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(JSON.stringify({ url }));
      } else {
        const link = document.createElement("a");
        link.href = url;
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      const updatedItems: SelectedBox[] = appliedItems.map((i) =>
        i === item ? { ...i, status: "completed" } : i
      );

      setAppliedItems(updatedItems);
      localStorage.setItem("appliedItems", JSON.stringify(updatedItems));
      setFilter("applied");
    } else {
      console.error(
        "classData.gatherUrl is missing or invalid:",
        classData.gatherUrl
      );
    }
  };

  const handleSearchBoxClick = (item: SelectedBox, classData: any) => {
    navigate("/mentorbus-frontend/classinfo", {
      state: {
        selectedBox: item,
        content: classData.content,
      },
    });
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
        roadDivRef.current.style.background = "white";
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const itemsFromStorage = JSON.parse(
      localStorage.getItem("appliedItems") || "[]"
    );
    const parsedItems: SelectedBox[] = itemsFromStorage.filter(isSelectedBox);
    setAppliedItems(parsedItems);

    const classDataArray = JSON.parse(
      localStorage.getItem("ClassData") || "[]"
    );

    if (Array.isArray(classDataArray)) {
      setClassDataArray(classDataArray);
    } else {
      setClassDataArray([]);
    }
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
                진행예정
              </div>
              <div
                className={`filter_btn_label ${
                  filter === "applied" ? "active" : ""
                }`}
                onClick={() => setFilter("applied")}
              >
                진행완료
              </div>
            </div>

            <div className="grid place-items-center mt-3">
              <Info
                Info={
                  "멘토는 자유롭게 수업 입장 가능하며, 멘티들은 수업 시작 10분 전부터 입장이 가능합니다."
                }
              />
            </div>

            <div ref={roadDivRef} className="grid place-items-center">
              {classDataArray.map((classData, index) => {
                const appliedItem = appliedItems[index];

                if (
                  (filter === "entry" && appliedItem?.status !== "completed") ||
                  (filter === "applied" && appliedItem?.status === "completed")
                ) {
                  return (
                    <div
                      key={index}
                      className="grid place-items-center w-[80%] mt-[0px] h-[120px] relative "
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const clickX = e.clientX - rect.left;

                        // 전체 넓이의 80%까지 클릭 시에만 handleSearchBoxClick 호출
                        if (clickX <= rect.width * 0.8 && filter === "entry") {
                          handleSearchBoxClick(appliedItem, classData);
                        }
                      }}
                    >
                      <SearchBox
                        gen={appliedItem?.gen || ""}
                        major={classData.title}
                        name={name || ""}
                        info={major || ""}
                        date={classData.date}
                        sort={classData.gatherUrl}
                        variant="default"
                        size="default"
                        onClick={
                          filter === "entry"
                            ? () => handleEnter(appliedItem, classData)
                            : undefined
                        }
                      >
                        {filter === "entry" ? "수업입장" : "수업 완료"}
                      </SearchBox>
                    </div>
                  );
                }

                return null;
              })}
            </div>
          </div>
          <div ref={growDivRef}></div>
          <BottomNav />
        </div>
      </div>
    </>
  );
}
