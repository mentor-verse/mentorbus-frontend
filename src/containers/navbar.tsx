import { useState, useEffect } from "react";
import {
  Home,
  FindMentor,
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

  useEffect(() => {
    // 로컬 스토리지에서 position 값을 가져옴
    const position = localStorage.getItem("position");

    // 현재 경로가 "/mentorbus-frontend/qabus"이고, position 값이 "멘티"인 경우에만 PencilBtn을 보여줌
    if (
      location.pathname === "/mentorbus-frontend/qabus" &&
      position === "멘티"
    ) {
      setShowPencilBtn(true);
    } else {
      setShowPencilBtn(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    // 로컬 스토리지에서 position 값을 가져옴
    const position = localStorage.getItem("position");

    // 현재 경로가 "/mentorbus-frontend/qabus"이고, position 값이 "멘티"인 경우에만 PencilBtn을 보여줌
    if (
      location.pathname === "/mentorbus-frontend/mentorbus" &&
      position === "멘토"
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
        <div>
          <Link to="/mentorbus-frontend/main">
            <Home color={getColor("/mentorbus-frontend/main")} />
          </Link>
        </div>
        <div>
          <Link to="/mentorbus-frontend/find">
            <FindMentor color={getColor("/mentorbus-frontend/find")} />
          </Link>
        </div>
        <div>
          <Link to="/mentorbus-frontend/mentorbus">
            <MentorBus color={getColor("/mentorbus-frontend/mentorbus")} />
          </Link>
        </div>
        <div>
          <Link to="/mentorbus-frontend/qabus">
            <QABus color={getColor("/mentorbus-frontend/qabus")} />
          </Link>
        </div>
        <div>
          <Link to="/mentorbus-frontend/mypage">
            <MyPage color={getColor("/mentorbus-frontend/mypage")} />
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default BottomNav;
