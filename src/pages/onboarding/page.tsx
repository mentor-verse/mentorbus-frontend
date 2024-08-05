// src/components/Onboarding.tsx
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { isLoggedInAtom } from "@/atoms/isLoggedInAtom";
import Zero from "./containers/Zero";
import { First } from "./containers/First";
import { Second } from "./containers/Second";
import { Third } from "./containers/Third";
import { Fourth } from "./containers/Fourth";
import { Road } from "@/components/Icons/Road";
import { ZeroRoad } from "@/components/Icons/ZeroRoad";
import useAuth from "@/hooks/useAuth";

export function Onboarding() {
  const isLoggedIn = useRecoilValue(isLoggedInAtom);
  const [count, setCount] = useState(0);
  const { signIn } = useAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const specialQuery = urlParams.get("specialQuery");
    const kakaoToken = urlParams.get("kakaoToken");

    if (specialQuery) {
      setCount(1);
    } else if (isLoggedIn || kakaoToken || localStorage.getItem("kakaoToken")) {
      if (kakaoToken) {
        signIn(kakaoToken);
      }
      setCount(1);
    } else {
      setCount(0);
    }
  }, [isLoggedIn, signIn]);

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
              sentence={"학과를 입력해주세요"}
            />
          </div>
        );
      case 4:
        return (
          <div className="rendered-component">
            <Fourth
              count={count}
              setCount={setCount}
              sentence={"학과를 입력해주세요"}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative w-screen h-screen bg-white">
      <div className="absolute left-0 right-0 m-auto h-[158px] w-[276px] mt-[52px]">
        {count === 0 ? <ZeroRoad /> : <Road />}
      </div>
      <div>{renderComponent()}</div>
    </div>
  );
}
