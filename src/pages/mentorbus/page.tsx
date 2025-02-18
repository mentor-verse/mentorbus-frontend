import { useState, useEffect, useRef } from "react";
import { SearchBox } from "@/components/ui/searchbox";
import { Info } from "@/components/ui/info";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BottomNav from "@/containers/navbar";
import { useGetClassMy } from "@/hooks/useGetClassMy";
import { useQueryClient } from "@tanstack/react-query";
import { useGetClass } from "@/hooks/useGetClass";
import { usePatchClassStatus } from "@/hooks/usePatchClassStatus";

declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage: (message: string) => void;
    };
  }
}

interface SelectedBox {
  userId: number;
  id: number;
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
  const queryClient = useQueryClient();
  const [classDataArray, setClassDataArray] = useState([]);
  const [InfoBox, setInfoBox] = useState(false);
  const [user_Id, setUserId] = useState<string | null>("");
  const [userClassData, setUserClassData] = useState<UserClassData | null>(
    null
  );

  const position = localStorage.getItem("position");

  useEffect(() => {
    if (position === "멘토") {
      setInfoBox(true);
    } else {
      setInfoBox(false);
    }
  }, [position]);

  const [filter, setFilter] = useState("unFinished");
  const [appliedItems, setAppliedItems] = useState<SelectedBox[]>([]);
  const growDivRef = useRef<HTMLDivElement>(null);
  const roadDivRef = useRef<HTMLDivElement>(null);
  //const [classDataArray] = useState<{ title: string; content: string; date: string; gatherUrl: string }[]>([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setUserId(userId);
  }, []);

  const userId = 4321;

  const { mutateAsync: patchPost, isLoadingPatch }: any = usePatchClassStatus();

  const {
    data: respGetClassMy,
    isLoading: isLoadingGetClassMy,
    isError: isErrorGetClassMy,
    refetch: refetchGetClassMy,
  } = useGetClassMy({ userId });

  const classIds = (respGetClassMy ?? []).map((item) => item.classId);

  const {
    data: respGetClass,
    isLoading: isLoadingGetClass,
    isError: isErrorGetClass,
    refetch: refetchGetClass,
  } = useGetClass({
    take: 10,
    major: null,
    job: null,
    userId: null,
    classId: classIds,
  });

  useEffect(() => {
    if (respGetClass) {
      setClassDataArray(respGetClass);
      console.log("classDataArray", classDataArray);
    }
  }, [respGetClass]);

  useEffect(() => {
    if (!queryClient.getQueryData(["getClass"])) {
      refetchGetClass();
    }
  }, [queryClient, refetchGetClass]);

  useEffect(() => {
    if (!queryClient.getQueryData(["getClassMy"])) {
      refetchGetClassMy();
    }
  }, [queryClient, refetchGetClassMy]);

  useEffect(() => {
    if (respGetClassMy) {
      setUserClassData(respGetClassMy);
      console.log("resp", respGetClassMy);
      console.log("setUserClassData", userClassData);
    }
  }, [respGetClassMy]);

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

      const userId = localStorage.getItem("userId");
      const classId = item.id;

      try {
        await patchPost({
          userId,
          classId,
          isFinished: true,
        });
      } catch (error) {
        console.error("Error updating class status:", error);
      }
    } else {
      console.error("item.map is missing or invalid:", item.map);
    }
  };

  if (isLoadingGetClassMy || isLoadingGetClass || isLoadingPatch) {
    return (
      <div
        style={{
          color: "#888888",
          fontSize: "25px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "50vh",
        }}
      >
        <div
          style={{
            width: "800px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          ⏰
        </div>
        로딩 중입니다<br></br>잠시 기다려주세요
      </div>
    );
  }

  // 1. resp (useGetClassMy의 응답)에서 필터링
  const filteredUserClasses = respGetClassMy
    ? respGetClassMy.filter((r: any) => {
        if (filter === "unFinished") {
          return r.isFinished === "0"; // 진행예정
        } else if (filter === "finished") {
          return r.isFinished === "1"; // 진행완료
        }
        return true;
      })
    : [];

  // 2. 필터링된 resp 항목에 해당하는 classDataArray의 수업 정보를 찾기
  const filteredClasses = filteredUserClasses
    .map((userClass: any) => {
      return classDataArray.find(
        (classItem: any) => classItem.id === userClass.classId
      );
    })
    .filter(Boolean);

  console.log("filteredClasses:", filteredClasses);

  if (isErrorGetClassMy || isErrorGetClass) return <p>에러발생 삐용삐용</p>;

  return (
    <>
      <div className="main" style={{ background: "#fff" }}>
        <div className="main_content">
          <div style={{ background: "#fff" }}>
            <div className="text-lg not-italic font-bold text-[19px] mt-[20px]">
              멘토버스
            </div>
            <div className="flex justify-between mt-[40px]">
              <div
                className={`filter_btn_label ${
                  filter === "unFinished" ? "active" : ""
                }`}
                onClick={() => setFilter("unFinished")}
              >
                진행예정
              </div>
              <div
                className={`filter_btn_label ${
                  filter === "finished" ? "active" : ""
                }`}
                onClick={() => setFilter("finished")}
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
              {filteredClasses.length > 0 ? (
                filteredClasses.map((classData: any, index: number) => (
                  <div
                    key={index}
                    className="grid place-items-center w-[80%] mt-[0px] h-[120px] relative"
                  >
                    <SearchBox
                      gen={classData?.gen || ""}
                      major={classData.title || ""}
                      name={classData.name || ""}
                      info={classData.major || ""}
                      date={classData.date || ""}
                      sort={classData.map || ""}
                      variant="default"
                      size="default"
                      onClick={
                        filter === "unFinished"
                          ? () => handleEnter(classData, classData)
                          : undefined
                      }
                    >
                      {filter === "unFinished" ? "수업입장" : "수업 완료"}
                    </SearchBox>
                  </div>
                ))
              ) : (
                <p>조건에 맞는 데이터가 없습니다.</p>
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

//---------------------------------------------------------//

//---------------------------------------------------------//

//---------------------------------------------------------//

//---------------------------------------------------------//

//---------------------------------------------------------//

//---------------------------------------------------------//

export function MentorBusPageMentor() {
  const queryClient = useQueryClient();
  const [userClassData, setUserClassData] = useState<UserClassData | null>(
    null
  );

  const [filter, setFilter] = useState("entry");
  const [appliedItems, setAppliedItems] = useState<SelectedBox[]>([]);
  const [kakao_id, setKakaoId] = useState<string | null>("");

  const growDivRef = useRef<HTMLDivElement>(null);
  const roadDivRef = useRef<HTMLDivElement>(null);
  const [classDataArray, setClassDataArray] = useState<
    { title: string; content: string; date: string; gatherUrl: string }[]
  >([]);

  const navigate = useNavigate(); // useNavigate 사용

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const kakao_id = searchParams.get("mentor_id");
    setKakaoId(kakao_id);
    console.log("kakao_id", kakao_id);
  }, [location.search]);

  useEffect(() => {
    if (kakao_id) {
      loadAppliedItems();
    }
  }, [kakao_id]);

  /*
  const userId = 1234;
  const { data: resp, isLoading, isError, refetch } = useGetClassMy({ userId });

  useEffect(() => {
    if (!queryClient.getQueryData(["get-class-data"])) {
      refetch();
    }
  }, [queryClient, refetch]);

  useEffect(() => {
    setUserClassData(resp);
    console.log("resp", resp);
    console.log("setUserClassData", userClassData);
  }, [resp]);
  */

  const loadAppliedItems = async () => {
    try {
      const response = await axios.get(
        `https://port-0-mentorbus-backend-m0zjsul0a4243974.sel4.cloudtype.app/classes/myClass/${kakao_id}`
      );

      console.log("Full Response Object:", response);

      if (response.status === 200) {
        const itemsFromApi = Array.isArray(response.data)
          ? response.data
          : [response.data];

        console.log("itemsFromApi:", itemsFromApi);

        setAppliedItems(itemsFromApi);
      } else {
        console.error("Unexpected response status:", response.status);
        setAppliedItems([]);
      }
    } catch (error) {
      console.error("Error fetching data from API:", error);
      setAppliedItems([]);
    }
  };

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
          `https://port-0-mentorbus-backend-m0zjsul0a4243974.sel4.cloudtype.app/classes/${
            item.id + 1
          }/status`,
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

  const handleSearchBoxClick = (appliedItems: SelectedBox, classData: any) => {
    console.log(
      "Navigating with item:",
      appliedItems,
      "and classData:",
      classData
    );
    navigate("/classinfo", {
      state: {
        selectedBox: appliedItems,
        content: appliedItems?.content,
        classData,
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

  /*
  if (isLoading) {
    return (
      <div
        style={{
          color: "#888888",
          fontSize: "25px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // 수평 중앙 정렬
          justifyContent: "center", // 수직 중앙 정렬
          height: "50vh", // 화면 전체 높이 설정
        }}
      >
        <div
          style={{
            width: "800px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          ⏰
        </div>
        로딩 중입니다<br></br>잠시 기다려주세요
      </div>
    ); // 로딩 상태일 때 표시할 내용
  }

  if (isError) return <p>에러발생 삐용삐용</p>;
  */

  return (
    <>
      <div className="main" style={{ background: "#fff" }}>
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
              {appliedItems.map((appliedItem, index) => {
                const classData = classDataArray[index];

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
                        major={appliedItem.title}
                        name={appliedItem.name || ""}
                        info={appliedItem.major || ""}
                        date={appliedItem.date}
                        sort={appliedItem.map}
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
