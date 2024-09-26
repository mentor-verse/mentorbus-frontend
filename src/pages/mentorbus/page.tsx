import { useState, useEffect, useRef } from "react";
import { SearchBox } from "@/components/ui/searchbox";
import { Info } from "@/components/ui/info";
import { useNavigate } from "react-router-dom";
import axios from "axios";

declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage: (message: string) => void;
    };
  }
}

interface SelectedBox {
  id: any;
  gen: string;
  major: string;
  name: string;
  info: string;
  date: string;
  sort: string;
  status: "pending" | "completed";

  nickname: string;
  title: string;
  num: string;
  map: string;
  content: string;
}

// Fetch the position value from localStorage
const position = localStorage.getItem("position");

// Common type and interface declarations
type SortType = "인문계열" | "예술계열" | "IT계열" | "공학계열";

// Common function to check SortType
function isSortType(value: any): value is SortType {
  return ["인문계열", "예술계열", "IT계열", "공학계열"].includes(value);
}

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
  const [InfoBox, setInfoBox] = useState(false);

  const position = localStorage.getItem("position");

  useEffect(() => {
    // 로컬 스토리지에서 position 값을 가져옴

    if (position === "멘토") {
      setInfoBox(true);
    } else {
      setInfoBox(false);
    }
  }, [position]);

  const [filter, setFilter] = useState("entry");
  const [appliedItems, setAppliedItems] = useState<SelectedBox[]>([]);
  const growDivRef = useRef<HTMLDivElement>(null);
  const roadDivRef = useRef<HTMLDivElement>(null);
  const [classDataArray] = useState<
    { title: string; content: string; date: string; gatherUrl: string }[]
  >([]);

  const navigate = useNavigate();

  const loadAppliedItems = async () => {
    try {
      const response = await axios.get(
        `https://port-0-mentorbus-backend-m0zjsul0a4243974.sel4.cloudtype.app/classes/myClass`
      );

      console.log("Full Response Object:", response);

      if (response.status === 200) {
        // Check if response.data is an object, and wrap it in an array
        const itemsFromApi = Array.isArray(response.data)
          ? response.data
          : [response.data];

        console.log("itemsFromApi:", itemsFromApi);

        const parsedItems: SelectedBox[] = itemsFromApi
          .map((item: any) => ({
            ...item,
            status: item.status === "completed" ? "completed" : "pending",
          }))
          .filter((item) => isSelectedBox(item));

        console.log(parsedItems);

        setAppliedItems(itemsFromApi);
        console.log(appliedItems);
      } else {
        console.error("Unexpected response status:", response.status);
        setAppliedItems([]);
      }
    } catch (error) {
      console.error("Error fetching data from API:", error);
      setAppliedItems([]);
    }
  };

  useEffect(() => {
    loadAppliedItems(); // Fetch data on mount
    console.log("appliedItem", appliedItems);

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "appliedItems") {
        loadAppliedItems(); // Refetch data when localStorage changes
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [name]); // Run the effect when id changes

  const handleEnter = async (item: SelectedBox, classData: any) => {
    console.log(
      "handleEnter called with item:",
      item,
      "and classData:",
      classData
    );

    if (item.map) {
      const url = `https://app.gather.town/invite?token=${item.map}`;
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

      // 서버에 PATCH 요청 보내기
      try {
        const response = await fetch(
          `https://port-0-mentorbus-backend-m0zjsul0a4243974.sel4.cloudtype.app/classes/${item.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: "completed" }),
          }
        );

        const data = await response.json();
        console.log("서버 응답:", data);
        console.log("updatedItems", updatedItems);
        console.log("updatedItems.length", updatedItems.length);

        // 성공적으로 서버에서 업데이트 된 경우
        if (response.ok) {
          updatedItems[updatedItems.length].status = "completed";

          setAppliedItems(updatedItems);
        } else {
          console.error("업데이트 실패", data.message);
        }
      } catch (error) {
        console.error("에러 발생:", error);
      }
    } else {
      console.error(
        "classData.gatherUrl is missing or invalid:",
        classData.gatherUrl
      );
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSearchBoxClick = (item: SelectedBox, classData: any) => {
    navigate("/mentorbus-frontend/classinfo", {
      state: {
        selectedBox: item,
        content: classData.content,
      },
    });
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
              {InfoBox && (
                <Info
                  Info={
                    "멘토는 자유롭게 수업 입장 가능하며, 멘티들은 수업 시작 10분 전부터 입장이 가능합니다."
                  }
                />
              )}
            </div>

            <div ref={roadDivRef} className="grid place-items-center">
              {appliedItems.map((appliedItem, index) => {
                // appliedItems에서 데이터를 가져옵니다.
                const classData = classDataArray[index];

                if (
                  (filter === "entry" && appliedItem.status !== "completed") ||
                  (filter === "applied" && appliedItem.status === "completed")
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
                        gen={appliedItem?.gen || ""} // appliedItem에서 데이터 가져오기
                        major={appliedItem.title || ""} // classData가 아니라 appliedItem에서 major 가져오기
                        name={appliedItem.name || ""}
                        info={appliedItem.major || ""}
                        date={appliedItem.date || ""}
                        sort={appliedItem.map || ""}
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
          {/*<BottomNav />*/}{" "}
        </div>
      </div>
    </>
  );
}

//---------------------------------------------------------//

//---------------------------------------------------------//

//---------------------------------------------------------//

//---------------------------------------------------------//

//---------------------------------------------------------//

//---------------------------------------------------------//

export function MentorBusPageMentor() {
  const [filter, setFilter] = useState("entry");
  const [appliedItems, setAppliedItems] = useState<SelectedBox[]>([]);
  const [, setLoading] = useState(true); // 로딩 상태 추가

  const growDivRef = useRef<HTMLDivElement>(null);
  const roadDivRef = useRef<HTMLDivElement>(null);
  const [classDataArray, setClassDataArray] = useState<
    { title: string; content: string; date: string; gatherUrl: string }[]
  >([]);

  const name = localStorage.getItem("userName") || "";
  const major = localStorage.getItem("major") || "";

  const navigate = useNavigate(); // useNavigate 사용

  const loadAppliedItems = async () => {
    try {
      // API로 데이터를 fetch
      const response = await axios.get(
        "https://port-0-mentorbus-backend-m0zjsul0a4243974.sel4.cloudtype.app/classes"
      );

      if (response.status === 200 && Array.isArray(response.data)) {
        const itemsFromApi = response.data;
        console.log("res:", response);
        console.log(itemsFromApi);
        // 각 아이템을 처리하여 상태를 갱신
        const parsedItems: SelectedBox[] = itemsFromApi
          .map((item: any) => ({
            ...item,
            status: item.status === "completed" ? "completed" : "pending",
          }))
          .filter((item) => isSelectedBox(item));

        setAppliedItems(parsedItems);
      } else {
        console.error(
          "API에서 가져온 데이터가 배열이 아닙니다:",
          response.data
        );
        setAppliedItems([]);
      }
    } catch (error) {
      console.error(
        "API로부터 데이터를 가져오는 중 오류가 발생했습니다:",
        error
      );
      setAppliedItems([]);
    }

    setLoading(false); // Data loaded, set loading to false
  };

  useEffect(() => {
    loadAppliedItems(); // 컴포넌트가 처음 마운트될 때만 실행

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "appliedItems") {
        loadAppliedItems(); // 로컬 스토리지 변화 감지 시만 실행
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []); // 의존성 배열에서 appliedItems 제거

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
        </div>
      </div>
    </>
  );
}
