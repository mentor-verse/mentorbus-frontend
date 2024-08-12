import * as React from "react";
import { cn } from "../../libs/utils.ts";

export interface InfoProps extends React.HTMLAttributes<HTMLDivElement> {
  Info: string;
}

const Info = React.forwardRef<HTMLDivElement, InfoProps>(
  ({ className, Info }, ref) => {
    return (
      <div
        className={cn(
          "w-[80%] h-[38px] align-middle grid place-content-center bg-[#F2F5F6]",
          className
        )}
        ref={ref}
      >
        <div className={cn("text-[9px] text-[#333333] font-medium", className)}>
          📢 &nbsp; {Info}
        </div>
      </div>
    );
  }
);

Info.displayName = "Info";

export { Info };
