import { cn } from "@/libs/utils.ts";
import React from "react";

export interface MentorInfoProps extends React.HTMLAttributes<HTMLDivElement> {
  content: string;
}

const MentorInfo = React.forwardRef<HTMLDivElement, MentorInfoProps>(
  ({ className, content }, ref) => {
    return (
      <>
        <div
          ref={ref}
          className={cn(
            "text-[12px] not-italic font-normal leading-[normal] tracking-[-0.52px] text-[#474747] text-start w-[80%] grid place-content-center",
            className
          )}
        >
          <div style={{ whiteSpace: "pre-line" }}>{content}</div>
        </div>
      </>
    );
  }
);

MentorInfo.displayName = "MentorInfo";

export { MentorInfo };
