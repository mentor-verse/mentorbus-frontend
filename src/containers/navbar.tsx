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

    if (location.pathname === "/qabus" && storedPosition === "멘티") {
      setShowPencilBtn(true);
    } else {
      setShowPencilBtn(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    const storedPosition = localStorage.getItem("position");
    if (location.pathname === "/mentorbus" && storedPosition === "멘토") {
      setshowPlusBtn(true);
    } else {
      setshowPlusBtn(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname === "/main") {
      setChannelBtn(true);
    } else {
      setChannelBtn(false);
    }
  }, [location.pathname]);

  const getColor = (path: string): string => {
    return location.pathname === path ? "#393939" : "#B2BAC2";
  };

  const handleClick = () => {
    navigate("/applyquestion");
  };

  const handleClick2 = () => {
    navigate("/openclass");
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
          <a href="/">
            <Home color={getColor("/")} />
          </a>
        </div>
        <div className="flex justify-center">
          <a href="/find">
            {position === "멘토" ? (
              <FindMentee color={getColor("/find")} />
            ) : (
              <FindMentor color={getColor("/find")} />
            )}
          </a>
        </div>
        <div className="flex justify-center">
          {/* mentee_id 변수를 사용하여 href 속성에 적용 */}
          {position === "멘토" ? (
            <a href={`/mentorbus?mentor_id=${mentor_id}`}>
              <MentorBus color={getColor("/mentorbus")} />
            </a>
          ) : (
            <a href={`/mentorbus?mentee_id=${mentee_id}`}>
              <MentorBus color={getColor("/mentorbus")} />
            </a>
          )}
        </div>
        <div className="flex justify-center">
          <a href="/qabus">
            <QABus color={getColor("/qabus")} />
          </a>
        </div>
        <div className="flex justify-center">
          <a href="/mypage">
            <MyPage color={getColor("/mypage")} />
          </a>
        </div>
      </nav>
    </div>
  );
};

export default BottomNav;
