import * as React from "react";
import { cn } from "@/libs/utils.ts";

export interface TitleSectionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string | undefined;
  title2: string;
  major: string | null | undefined;
  title3: string;
}

const TitleSection = React.forwardRef<HTMLDivElement, TitleSectionProps>(
  ({ className, title, title2, title3, major }) => {
    return (
      <div
        className={cn(
          "flex not-italic font-bold text-[14px] text-black ml-[28px] mt-[30px] ",
          className
        )}
      >
        <p className="text-[#30A2E3]">{title}</p>
        {title2} {major} {title3}
      </div>
    );
  }
);

TitleSection.displayName = "TitleSection";

export { TitleSection };
