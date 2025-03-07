import React, { SetStateAction } from "react";
import Zero from "./steps/Zero";
import { First } from "./steps/First";
import { Second } from "./steps/Second";
import { Third } from "./steps/Third";
import { Fourth } from "./steps/Fourth";
import { Fifth } from "./steps/Fifth";

interface OnboardingContainerProps {
  count: number;
  setCount: React.Dispatch<SetStateAction<number>>;
  showSecondMentor: boolean;
  showSecondMentee: boolean;
  showThirdMentor: boolean;
  showThirdMentee: boolean;
}

export function OnboardingContainer({
  count,
  setCount,
  showSecondMentor,
  showSecondMentee,
  showThirdMentor,
  showThirdMentee,
}: OnboardingContainerProps) {
  console.log(localStorage);

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
          {showSecondMentor && (
            <Third
              count={count}
              setCount={setCount}
              sentence={"소속대학교/직장을 알려주세요"}
            />
          )}
          {showSecondMentee && (
            <Third
              count={count}
              setCount={setCount}
              sentence={"소속학교를 알려주세요"}
            />
          )}
        </div>
      );
    case 4:
      return (
        <div className="rendered-component">
          {showThirdMentor && (
            <Fourth
              count={count}
              setCount={setCount}
              sentence={"소속 계열을 선택해주세요"}
            />
          )}
          {showThirdMentee && (
            <Fourth
              count={count}
              setCount={setCount}
              sentence={"관심 계열을 선택해주세요"}
            />
          )}
        </div>
      );
    case 5:
      return (
        <div className="rendered-component">
          <Fifth
            count={count}
            setCount={setCount}
            sentence={"관심사를 선택해주세요"}
          />
        </div>
      );
    default:
      return null;
  }
}
