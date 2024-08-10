// src/components/Onboarding.tsx
import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { isLoggedInAtom } from "@/atoms/isLoggedInAtom";
import Zero from "./containers/Zero";
import { First } from "./containers/First";
import { Second } from "./containers/Second";
import { Third } from "./containers/Third";
import { Fourth } from "./containers/Fourth";
import { Road } from "@/components/Icons/Road";
import { ZeroRoad } from "@/components/Icons/ZeroRoad"; // ZeroRoad 컴포넌트를 가져옵니다
import { useNavigate } from "react-router-dom";
import { Cloud } from "@/components/Icons/Cloud";
import { Cloud2 } from "@/components/Icons/Cloud2";

export function Onboarding() {
  const isLoggedIn = useRecoilValue(isLoggedInAtom);
  const [count, setCount] = useState(0);
  const growDivRef = useRef<HTMLDivElement>(null);
  const roadDivRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const position = localStorage.getItem("position");
    const userName = localStorage.getItem("userName");
    const userBelong = localStorage.getItem("userBelong");
    const major = localStorage.getItem("major");
    const kakao = localStorage.getItem("transformedUserData");

    if (position && userName && userBelong && major && kakao) {
      navigate(`/mentorbus-frontend/main?userName=${userName}`);
    }
  }, [navigate]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const specialQuery = urlParams.get("specialQuery"); // 'specialQuery'를 원하는 쿼리 파라미터 이름으로 변경

    if (specialQuery) {
      setCount(1);
    } else if (isLoggedIn || localStorage.getItem("kakaoToken")) {
      setCount(1);
    } else {
      setCount(0);
    }
  }, [isLoggedIn]);

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
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [count]);

  const renderComponent = () => {
    switch (count) {
      case 0:
        return (
          <div className="rendered-component">
            <Zero count={count} setCount={setCount} />
          </div>
        );
      case 1:
        return (
          <div className="rendered-component">
            <First
              count={count}
              setCount={setCount}
              sentence={"닉네임을 입력해주세요"}
            />
          </div>
        );
      case 2:
        return (
          <div className="rendered-component">
            <Second
              count={count}
              setCount={setCount}
              sentence={"무엇을 하고 싶나요"}
            />
          </div>
        );
      case 3:
        return (
          <div className="rendered-component">
            <Third
              count={count}
              setCount={setCount}
              sentence={"소속대학교/직장을 알려주세요"}
            />
          </div>
        );
      case 4:
        return (
          <div className="rendered-component">
            <Fourth
              count={count}
              setCount={setCount}
              sentence={"소속 계열을 선택해주세요"}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="main flex flex-col min-h-screen overflow-hidden">
      <div className="main_content flex flex-col flex-1">
        <div className="fixed  w-full z-0">
          <div className="fixed top-[10vh] right-0 ">
            <Cloud />
          </div>
          <div className="fixed left-0 top-[20vh] ">
            <Cloud2 />
          </div>
        </div>
        {renderComponent()}
        <div ref={growDivRef}></div>
        {count === 0 ? (
          <div ref={roadDivRef} className="w-full">
            <div className="w-[120%] -ml-[20%] grid place-items-center">
              <ZeroRoad />
            </div>
          </div>
        ) : (
          count !== 0 && (
            <div ref={roadDivRef} className="w-full">
              <div className="grid place-items-center">
                <Road />
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
