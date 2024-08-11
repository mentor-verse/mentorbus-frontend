import { cn } from "@/libs/utils.ts";
import React from "react";
import FindTitle from "../containers/FindTitle";
import BottomNav from "@/containers/navbar";

export interface NotYetPageProps extends React.HTMLAttributes<HTMLDivElement> {}

const NotYetPage = React.forwardRef<HTMLDivElement, NotYetPageProps>(
  ({ className }) => {
    return (
      <div className={cn("relative min-h-screen flex flex-col", className)}>
        <FindTitle
          title="멘토 찾기"
          Link={""}
          back_disable={"no"}
          back_work={"no"}
        />
        <div className="flex-grow flex justify-center items-center bg-white">
          <div className="text-center text-[#333333]">
            <div className="text-[79px] mb-4">🚧</div>
            <div className="text-[19px] font-bold mb-2">업데이트 예정</div>
            <div className="text-[12px] font-medium">
              앞으로의 멘토버스를 기대해주세요!
            </div>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }
);

NotYetPage.displayName = "NotYetPage";

export { NotYetPage };
