import * as React from "react"

import { cn } from "../../libs/utils.ts"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isInvalid?: boolean;
  isDisabled?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, isDisabled = false, placeholder, ...props }, ref) => {
    return (
      <input
        type={type}
        placeholder={placeholder}
        className={cn(
            "flex items-center justify-center h-10 w-full border-b-2 border-white bg-transparent px-[10px] py-2 text-center text-white placeholder:text-muted-foreground focus:border-white focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            className,
            "text-[24px] font-semibold leading-[22px] tracking-[-1.41px] font-pretendard"
        )}
    
        ref={ref}
        disabled={isDisabled}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
