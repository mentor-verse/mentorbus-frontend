import { useState, useEffect, useRef, Key } from "react";
import { SearchBox } from "@/components/ui/searchbox";
import BottomNav from "@/containers/navbar";
import { useLocation } from "react-router-dom";
import { Info } from "@/components/ui/info";

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

type SortType = "인문계열" | "예술계열" | "IT계열" | "공학계열";

const gatherTownUrls: Record<SortType, string> = {
  인문계열: "nJCm-X-RR5OojtQzylwy",
  예술계열: "5RvF4SJkTl6csexWVxQw",
  IT계열: "PsbK1kvsSF2vqKIf-VLj",
  공학계열: "nWPWj7r6T8eRB2mVaUT8",
};

function isSortType(value: any): value is SortType {
  return ["인문계열", "예술계열", "IT계열", "공학계열"].includes(value);
}

function isSelectedBox(item: any): item is SelectedBox {
  return (
    typeof item.gen === "string" &&
    typeof item.major === "string" &&
    typeof item.name === "string" &&
    typeof item.info === "string" &&
    typeof item.date === "string" &&
    isSortType(item.sort) &&
    (item.status === "pending" || item.status === "completed")
  );
}

export function MentorBusPage() {
  const [filter, setFilter] = useState("entry");
  const [appliedItems, setAppliedItems] = useState<SelectedBox[]>([]);
  const growDivRef = useRef<HTMLDivElement>(null);
  const roadDivRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const [showDiv, setShowDiv] = useState(false);
  const [classDataArray, setClassDataArray] = useState<
    { title: string; content: string; date: string; gatherUrl: string }[]
  >([]);

  const name = localStorage.getItem("userName");
  const major = localStorage.getItem("major");

  useEffect(() => {
    const position = localStorage.getItem("position");

    if (
      location.pathname === "/mentorbus-frontend/mentorbus" &&
      position === "멘토"
    ) {
      setShowDiv(true);
    } else {
      setShowDiv(false);
    }
  }, [location.pathname]);

  const handleEnter = (item: SelectedBox) => {
    if (isSortType(item.sort)) {
      const url = `https://app.gather.town/invite?token=${
        gatherTownUrls[item.sort]
      }`;

      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(JSON.stringify({ url }));
      } else {
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

    // Load multiple class data entries, initializing as an empty array if not found
    const classDataArray = JSON.parse(
      localStorage.getItem("ClassData") || "[]"
    );

    if (Array.isArray(classDataArray)) {
      setClassDataArray(classDataArray); // Store this in state to render multiple SearchBox components
    } else {
      setClassDataArray([]); // Ensure it’s an empty array if not found or invalid
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
              {classDataArray.map(
                (
                  classData: {
                    title: string;
                    content: string;
                    date: string;
                    gatherUrl: string;
                  },
                  index: Key | null | undefined
                ) => (
                  <div
                    key={index}
                    className="grid place-items-center mt-[0px] h-[120px]"
                  >
                    <SearchBox
                      gen={appliedItems[index]?.gen || ""}
                      major={major}
                      name={name} // Use title from classData
                      info={classData.title} // Use content from classData
                      date={classData.date}
                      sort={classData.gatherUrl}
                      variant="default"
                      size="default"
                      onClick={
                        filter === "entry"
                          ? () => handleEnter(appliedItems[index])
                          : undefined
                      }
                    >
                      {filter === "entry" ? "입장하기" : "진행완료"}
                    </SearchBox>
                  </div>
                )
              )}
            </div>
          </div>
          <div ref={growDivRef}></div>
          <BottomNav />
        </div>
      </div>
    </>
  );
}
