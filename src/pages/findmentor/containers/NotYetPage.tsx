import { cn } from "@/libs/utils.ts";
import React from "react";
import FindTitle from "../containers/FindTitle";

export interface NotYetPageProps extends React.HTMLAttributes<HTMLDivElement> {
  content: string;
  order: string;
}

const NotYetPage = React.forwardRef<HTMLDivElement, NotYetPageProps>(
  ({ className }) => {
    return (
      <>
        <div className="main">
          <div className="main_content">
            <div style={{ background: "#fff" }}>
              <div>
                <FindTitle
                  title="멘토 찾기"
                  Link={""}
                  back_disable={""}
                  back_work={"yes"}
                />
              </div>
              <div
                className={cn(
                  "flex justify-center items-center min-h-[90vh] text-[13px] not-italic font-semibold leading-[normal] tracking-[-0.52px] mb-[20px]",
                  className
                )}
              >
                <div className="text-[#333333]">
                  <div className="text-[79px]">🚧</div>
                  <div className="text-[19px] font-bold">업데이트 예정</div>
                  <div className="text-[12px] font-medium">
                    앞으로의 멘토버스를 기대해주세요!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
);

NotYetPage.displayName = "NotYetPage";

export { NotYetPage };
