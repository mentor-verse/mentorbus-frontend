import { useState, useEffect } from "react";
import {
  Home,
  FindMentor,
  FindMentee,
  MentorBus,
  QABus,
  MyPage,
} from "@/components/Icons/Nav";
import { PencilBtn } from "@/components/Icons/PencilBtn";
import { useLocation, useNavigate } from "react-router-dom";
import { PlusButton } from "@/components/Icons/PlusButton";
import { Channel } from "@/components/Icons/Channel";

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [showPencilBtn, setShowPencilBtn] = useState(false);
  const [showPlusBtn, setshowPlusBtn] = useState(false);
  const [channelBtn, setChannelBtn] = useState(false);
  const [position, setPosition] = useState<string | null>(null);
  const [mentee_id, setMenteeId] = useState<string | null>(null);
  const [mentor_id, setMentorId] = useState<string | null>(null);

  useEffect(() => {
    if (position == "멘티") {
      setMenteeId(localStorage.getItem("kakao_id"));
    }
    {
      setMentorId(localStorage.getItem("kakao_id"));
    }
  }, []);

  useEffect(() => {
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

  useEffect(() => {
    if (location.pathname === "/mentorbus-frontend/main") {
      setChannelBtn(true);
    } else {
      setChannelBtn(false);
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

      {channelBtn && (
        <div className="above_wrapper_channel">
          <button className="custom-button-1">
            <Channel />
          </button>
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
          {/* mentee_id 변수를 사용하여 href 속성에 적용 */}
          {position === "멘토" ? (
            <a href={`/mentorbus-frontend/mentorbus?mentor_id=${mentor_id}`}>
              <MentorBus color={getColor("/mentorbus-frontend/mentorbus")} />
            </a>
          ) : (
            <a href={`/mentorbus-frontend/mentorbus?mentee_id=${mentee_id}`}>
              <MentorBus color={getColor("/mentorbus-frontend/mentorbus")} />
            </a>
          )}
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
