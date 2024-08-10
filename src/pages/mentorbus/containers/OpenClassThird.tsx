import * as React from "react";
import { useState, useEffect, CSSProperties } from "react";

import {
  ArtClass,
  ComputerClass,
  HumanityClass,
  ScienceClasss,
} from "@/components/Icons/Classes";

export interface OpenClassThirdProps
  extends React.HTMLAttributes<HTMLDivElement> {
  Link: string;
  back_disable: string;
  back_work: string;
  onSelectionStatusChange: (isButtonSelected: boolean) => void;
  onGatherUrlChange: (url: string) => void;
}

const buttonBaseStyles: CSSProperties = {
  width: "163px",
  height: "106px",
  border: "none",
  transition: "background-color 0.3s, border 0.3s",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  position: "relative" as "relative", // 'relative' 타입 명시적으로 지정
};

const selectedButtonStyles: CSSProperties = {
  border: "2px solid #47AEE7",
  backgroundColor: "#d9eaff",
};

const textStyle: CSSProperties = {
  position: "absolute" as "absolute", // 'absolute' 타입 명시적으로 지정
  color: "#fff",
  fontSize: "14px",
  fontWeight: "semibold",
  textAlign: "center",
  transform: "translate(-50%, -50%)",
  top: "50%",
  left: "50%",
};

const buttonValues: { [key: string]: string } = {
  computer: "PsbK1kvsSF2vqKIf-VLj",
  art: "5RvF4SJkTl6csexWVxQw",
  science: "nWPWj7r6T8eRB2mVaUT8",
  humanities: "nJCm-X-RR5OojtQzylwy",
};

const OpenClassThird = React.forwardRef<HTMLDivElement, OpenClassThirdProps>(
  ({ className, onSelectionStatusChange, onGatherUrlChange }, ref) => {
    const [selectedButton, setSelectedButton] = useState<string | null>(null);

    useEffect(() => {
      const isButtonSelected = selectedButton !== null;
      onSelectionStatusChange(!isButtonSelected);

      if (selectedButton && buttonValues[selectedButton]) {
        onGatherUrlChange(buttonValues[selectedButton]);
      }
    }, [selectedButton, onSelectionStatusChange, onGatherUrlChange]);

    return (
      <div className={`font-semibold text-[16px] ${className}`} ref={ref}>
        <div className="mt-[90px] mr-[250px]">멘토링 맵 개설</div>
        <div className="grid place-items-center gap-2">
          <div className="flex gap-2 mt-[30px]">
            <button
              style={{
                ...buttonBaseStyles,
                ...(selectedButton === "computer" ? selectedButtonStyles : {}),
                borderRadius: "10px",
              }}
              onClick={() => setSelectedButton("computer")}
            >
              <div style={{ width: "100%", height: "100%" }}>
                <ComputerClass />
              </div>
              <span style={textStyle}>Computer</span>
            </button>
            <button
              style={{
                ...buttonBaseStyles,
                ...(selectedButton === "art" ? selectedButtonStyles : {}),
                borderRadius: "10px",
              }}
              onClick={() => setSelectedButton("art")}
            >
              <div style={{ width: "100%", height: "100%" }}>
                <ArtClass />
              </div>
              <span style={textStyle}>Art</span>
            </button>
          </div>
          <div className="flex gap-2">
            <button
              style={{
                ...buttonBaseStyles,
                ...(selectedButton === "science" ? selectedButtonStyles : {}),
                borderRadius: "10px",
              }}
              onClick={() => setSelectedButton("science")}
            >
              <div style={{ width: "100%", height: "100%" }}>
                <ScienceClasss />
              </div>
              <span style={textStyle}>Science</span>
            </button>
            <button
              style={{
                ...buttonBaseStyles,
                ...(selectedButton === "humanities"
                  ? selectedButtonStyles
                  : {}),
                borderRadius: "10px",
              }}
              onClick={() => setSelectedButton("humanities")}
            >
              <div style={{ width: "100%", height: "100%" }}>
                <HumanityClass />
              </div>
              <span style={textStyle}>Humanities</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
);

OpenClassThird.displayName = "OpenClassThird";

export { OpenClassThird };
