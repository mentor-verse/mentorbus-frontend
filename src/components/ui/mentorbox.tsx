import * as React from "react";

import { cn } from "@/libs/utils.ts";

import { ManCircle } from "@/components/Icons/Man";
import { WomanCircle } from "@/components/Icons/Woman";

export interface MentorBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  major: string;
  name: string;
  info: string;
  gen: string;
}

const MentorBox = React.forwardRef<HTMLDivElement, MentorBoxProps>(
  ({ className, major, name, info, gen, ...props }, ref) => {
    return (
      <div className=" grid place-items-center">
        <div
          className={cn(
            " grid place-items-center w-40 h-48 p-2 border-[13px] border-white shadow-lg",
            className
          )}
          ref={ref}
          {...props}
        >
          <div className="text-center text-xs not-italic font-semibold text-[12px]">
            {name}
          </div>

          <div className="text-center not-italic font-medium text-[8px] mb-[7px]">
            {major}
          </div>

          <div className={gen}>
            {gen === "man" ? <ManCircle /> : <WomanCircle />}
          </div>

          <div
            className="text-gray-900 not-italic font-normal text-[8px] text-start mt-[13px]"
            style={{ whiteSpace: "pre-line" }}
          >
            {info}
          </div>
        </div>
      </div>
    );
  }
);
MentorBox.displayName = "MentorBox";

export { MentorBox };
