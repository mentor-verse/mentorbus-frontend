import * as React from "react";
import { cn } from "@/libs/utils.ts";
import { Slot } from "@radix-ui/react-slot";
import { Man } from "@/components/Icons/Man";
import { Woman } from "@/components/Icons/Woman";
import { cva, type VariantProps } from "class-variance-authority";

const searchBoxVariants = cva(
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

export interface SearchBoxProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof searchBoxVariants> {
  major: string;
  name: string;
  info: string;
  date: string;
  gen: string;
  sort: string;

  asChild?: boolean;
}

const SearchBox = React.forwardRef<HTMLButtonElement, SearchBoxProps>(
  (
    {
      className,
      major,
      name,
      info,
      date,
      gen,
      variant,
      size,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <div className={cn("flex text-start items-center w-full", className)}>
        <div className={gen}>{gen === "man" ? <Man /> : <Woman />}</div>

        <div className="ml-[15px] ">
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
              " mt-[8px] text-[#555] text-[9px] not-italic font-semibold leading-[normal] tracking-[-0.36px]",
              className
            )}
          >
            {name}
          </div>
          <div
            className={cn(
              "text-[#6D6D6D] text-[8px] not-italic font-medium leading-[normal] tracking-[-0.32px]",
              className
            )}
          >
            {info}
          </div>
          <div
            className={cn(
              "mt-[5px] text-[#6D6D6D] text-[8px] not-italic font-medium leading-[normal] tracking-[-0.32px]",
              className
            )}
          >
            {date}
          </div>
        </div>

        <div
          className={cn(
            "ml-auto [text-[#5C5A5A] text-right text-[11px] not-italic font-medium leading-[normal] tracking-[-0.33px]",
            className
          )}
        >
          <Comp
            className={cn(searchBoxVariants({ variant, size, className }))}
            ref={ref}
            {...props}
          />
        </div>
      </div>
    );
  }
);
SearchBox.displayName = "SearchBox";

export { SearchBox, searchBoxVariants };
