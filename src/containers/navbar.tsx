import { useState, useEffect } from "react";
import {
  Home,
  FindMentor,
  FindMentee, // FindMentee 아이콘 추가
  MentorBus,
  QABus,
  MyPage,
} from "@/components/Icons/Nav";
import { PencilBtn } from "@/components/Icons/PencilBtn";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PlusButton } from "@/components/Icons/PlusButton";

const BottomNav = () => {
  // 현재 선택된 아이콘을 관리하는 state
  const location = useLocation();
  const navigate = useNavigate();

  // PencilBtn 표시 여부를 관리하는 state
  const [showPencilBtn, setShowPencilBtn] = useState(false);
  const [showPlusBtn, setshowPlusBtn] = useState(false);

  // 사용자의 위치 정보를 관리하는 state
  const [position, setPosition] = useState<string | null>(null);

  useEffect(() => {
    // 로컬 스토리지에서 position 값을 가져옴
    const storedPosition = localStorage.getItem("position");
    setPosition(storedPosition);

    if (
      location.pathname === "/mentorbus-frontend/qabus" &&
      storedPosition === "멘티"
    ) {
      setShowPencilBtn(true);
    } else {
      setShowPencilBtn(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    // 로컬 스토리지에서 position 값을 가져옴
    const storedPosition = localStorage.getItem("position");

    if (
      location.pathname === "/mentorbus-frontend/mentorbus" &&
      storedPosition === "멘토"
    ) {
      setshowPlusBtn(true);
    } else {
      setshowPlusBtn(false);
    }
  }, [location.pathname]);

  const getColor = (path: string): string => {
    return location.pathname === path ? "#393939" : "#B2BAC2";
  };

  const handleClick = () => {
    navigate("/mentorbus-frontend/applyquestion");
  };

  const handleClick2 = () => {
    navigate("/mentorbus-frontend/openclass");
  };

  return (
    <div>
      {showPencilBtn && (
        <div onClick={handleClick} className="above_wrapper">
          <PencilBtn />
        </div>
      )}

      {showPlusBtn && (
        <div onClick={handleClick2} className="above_wrapper">
          <PlusButton />
        </div>
      )}

      <nav className="wrapper">
        <div className="flex justify-center">
          <a href="/mentorbus-frontend/main">
            <Home color={getColor("/mentorbus-frontend/main")} />
          </a>
        </div>
        <div className="flex justify-center">
          <a href="/mentorbus-frontend/find">
            {position === "멘토" ? (
              <FindMentee color={getColor("/mentorbus-frontend/find")} />
            ) : (
              <FindMentor color={getColor("/mentorbus-frontend/find")} />
            )}
          </a>
        </div>
        <div className="flex justify-center">
          <a href="/mentorbus-frontend/mentorbus">
            <MentorBus color={getColor("/mentorbus-frontend/mentorbus")} />
          </a>
        </div>
        <div className="flex justify-center">
          <a href="/mentorbus-frontend/qabus">
            <QABus color={getColor("/mentorbus-frontend/qabus")} />
          </a>
        </div>
        <div className="flex justify-center">
          <a href="/mentorbus-frontend/mypage">
            <MyPage color={getColor("/mentorbus-frontend/mypage")} />
          </a>
        </div>
      </nav>
    </div>
  );
};

export default BottomNav;
