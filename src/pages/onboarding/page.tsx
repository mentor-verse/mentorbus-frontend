import { useEffect, useRef, useState } from "react";
import ZeroRoad from "@/assets/ZeroRoad.svg?react";
import Road from "@/assets/Road.svg?react";
import Cloud from "@/assets/Cloud.svg?react";
import Cloud2 from "@/assets/Cloud2.svg?react";
import { OnboardingContainer } from "./containers/OnboardingContainer";

export function Onboarding() {
  const [count, setCount] = useState(0);
  const growDivRef = useRef<HTMLDivElement>(null);
  const roadDivRef = useRef<HTMLDivElement>(null);

  const [showSecondMentor, setShowSecondMentor] = useState(true);
  const [showSecondMentee, setShowSecondMentee] = useState(false);
  const [showThirdMentor, setShowThirdMentor] = useState(true);
  const [showThirdMentee, setShowThirdMentee] = useState(false);

  const prevCountRef = useRef<number>(count);

  useEffect(() => {
    const prevCount = prevCountRef.current;
    prevCountRef.current = count;

    const isMentor = localStorage.getItem("isMentor") === "true";

    if (count === prevCount + 1 || count === prevCount - 1) {
      if (!isMentor) {
        setShowSecondMentor(false);
        setShowSecondMentee(true);
        setShowThirdMentor(false);
        setShowThirdMentee(true);
      } else {
        setShowSecondMentor(true);
        setShowSecondMentee(false);
        setShowThirdMentor(true);
        setShowThirdMentee(false);
      }
    }
  }, [count]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const specialQuery = urlParams.get("specialQuery");

    if (specialQuery) {
      setCount(1);
    } else {
      setCount(0);
    }
  }, []);

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

  return (
    <div className="main flex flex-col min-h-screen overflow-hidden">
      <div className="main_content flex flex-col flex-1">
        <div className="fixed w-full z-0">
          <div className="fixed top-[10vh] right-0">
            <Cloud />
          </div>
          <div className="fixed left-0 top-[20vh]">
            <Cloud2 />
          </div>
        </div>
        <OnboardingContainer
          count={count}
          setCount={setCount}
          showSecondMentor={showSecondMentor}
          showSecondMentee={showSecondMentee}
          showThirdMentor={showThirdMentor}
          showThirdMentee={showThirdMentee}
        />
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
