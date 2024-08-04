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

export function Onboarding() {
  const isLoggedIn = useRecoilValue(isLoggedInAtom);
  const [count, setCount] = useState(0);
  const growDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLoggedIn || localStorage.getItem("kakaoToken")) {
      setCount(1);
    } else {
      setCount(0);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const handleResize = () => {
      if (growDivRef.current) {
        const mainContentHeight =
          document.querySelector(".main_content")?.clientHeight || 0;
        const renderedComponentHeight =
          document.querySelector(".rendered-component")?.clientHeight || 0;
        growDivRef.current.style.height = `${
          mainContentHeight - renderedComponentHeight
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
            {" "}
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
          <div className={"rendered-component"}>
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
      <div className="main_content">
        {renderComponent()}
        <div ref={growDivRef}></div>
        {count !== 0 && (
          <div className="w-full">
            <div className="grid place-items-center">
              <Road />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
