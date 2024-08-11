import * as React from "react";
import { cn } from "@/libs/utils.ts";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

const scheduleBoxVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-secondary text-secondary-foreground hover:bg-secondary/90 text-[11px]",
        state: "bg-transparent	text-[#5C5A5A] text-[11px]	",
        null: "text-[0px]",
      },
      size: {
        default: "h-[26px] w-[61px] px-[26px] py-[12px]",
        state: "h-[15px] w-[40px] px-[12px] py-[12px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ScheduleBoxProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof scheduleBoxVariants> {
  major: string;
  date: string;

  asChild?: boolean;
}

const ScheduleBox = React.forwardRef<HTMLButtonElement, ScheduleBoxProps>(
  (
    { className, major, date, variant, size, asChild = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <div
        className={cn(
          "flex text-start items-center w-[90%] h-[110px] flex-start rounded-[9px] border-[0.6px] border-[#BABABA]",
          className
        )}
      >
        <div className="ml-[15px] pl-[18px]">
          <div
            className={cn(
              "text-[13px] not-italic font-semibold leading-[normal] tracking-[-0.52px] w-[90%]",
              className
            )}
          >
            {major}
          </div>
          <div
            className={cn(
              "mt-[11px] text-[#555] text-[8px] not-italic font-medium leading-[normal] tracking-[-0.32px]",
              className
            )}
          >
            {date}
          </div>
        </div>

        <div
          className={cn(
            "ml-auto [text-[#5C5A5A] text-right text-[11px] not-italic font-medium leading-[normal] tracking-[-0.33px] pr-[23px]",
            className
          )}
        >
          <Comp
            className={cn(scheduleBoxVariants({ variant, size, className }))}
            ref={ref}
            {...props}
          />
        </div>
      </div>
    );
  }
);
ScheduleBox.displayName = "ScheduleBox";

export { ScheduleBox, scheduleBoxVariants };
