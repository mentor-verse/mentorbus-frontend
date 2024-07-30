// src/components/Onboarding.js
import { useRecoilValue } from 'recoil';
import { isLoggedInAtom } from '@/atoms/isLoggedInAtom';
import { Bottom } from "./containers/Bottom";
import  Zero from "./containers/Zero";
import { First } from "./containers/First";
import { Second } from "./containers/Second";
import { Third } from "./containers/Third";
import { Fourth } from "./containers/Fourth";
import { useState, useEffect } from 'react';

export function Onboarding() {
  const isLoggedIn = useRecoilValue(isLoggedInAtom);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isLoggedIn || localStorage.getItem('kakaoToken')) {
      setCount(1);
    } else {
      setCount(0);
    }
  }, [isLoggedIn]);

  const renderComponent = () => {
    switch (count) {
      case 0:
        return <Zero count={count} setCount={setCount} />;
      case 1:
        return <First count={count} setCount={setCount} sentence={"닉네임을 입력해주세요"} />;
      case 2:
        return <Second count={count} setCount={setCount} sentence={"무엇을 하고 싶나요"} />;
      case 3:
        return <Third count={count} setCount={setCount} sentence={"소속대학교/직장을 알려주세요"} />;
      case 4:
        return <Fourth count={count} setCount={setCount} sentence={"소속 계열을 선택해주세요"} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="main">
        <div className="main_content">
          <div className="relative w-full h-screen">
            {/* 
            <div className="absolute top-1/4 right-2 transform -translate-x-[0%] -translate-y-3/4 grid place-items-center z-2">
              <Cloud />
            </div>
            */}
            {renderComponent()}
            <Bottom />
          </div>
        </div>
      </div>
    </>
  );
}
