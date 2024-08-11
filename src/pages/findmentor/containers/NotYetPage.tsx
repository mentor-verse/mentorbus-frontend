import React, { useEffect, useRef } from "react";
import { cn } from "@/libs/utils.ts";
import FindTitle from "../containers/FindTitle";
import BottomNav from "@/containers/navbar";

export interface NotYetPageProps extends React.HTMLAttributes<HTMLDivElement> {}

const NotYetPage = React.forwardRef<HTMLDivElement, NotYetPageProps>(
  ({ className }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const updateHeight = () => {
        if (containerRef.current) {
          containerRef.current.style.height = `${window.innerHeight}px`;
        }
      };

      // Set initial height
      updateHeight();

      // Update height on resize
      window.addEventListener("resize", updateHeight);

      // Clean up event listener on unmount
      return () => window.removeEventListener("resize", updateHeight);
    }, []);

    return (
      <div
        className={cn("relative flex flex-col", className)}
        ref={containerRef}
      >
        <FindTitle
          title="멘티 찾기"
          Link={""}
          back_disable={"no"}
          back_work={"no"}
        />
        <main className="flex flex-1 justify-center items-center bg-white">
          <div className="text-center text-[#333333]">
            <div className="text-[79px] mb-4">🚧</div>
            <div className="text-[19px] font-bold mb-2">업데이트 예정</div>
            <div className="text-[12px] font-medium">
              앞으로의 멘토버스를 기대해주세요!
            </div>
          </div>
        </main>
        <BottomNav />
      </div>
    );
  }
);

NotYetPage.displayName = "NotYetPage";

export { NotYetPage };
