import * as React from "react";
import { cn } from "@/libs/utils.ts";

export interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  major: string | null | undefined;
}

const Header = React.forwardRef<HTMLDivElement, HeaderProps>(
  ({ className, major, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex justify-between  not-italic font-bold text-[19px] text-black	",
          className
        )}
        ref={ref}
        {...props}
      >
        <div className="flex items-center ml-[22px] border-none">{major}</div>
      </div>
    );
  }
);

Header.displayName = "Header";

export { Header };
