import * as React from "react"
import { cn } from "@/libs/utils.ts"  

export interface OnboardingButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  explain : string;
}

const OnboardingButton = React.forwardRef<HTMLDivElement, OnboardingButtonProps>(
  ({ className, explain, title }) => {
    

    return (
        <button className="flex justify-center">
             <div className={cn(" flex h-24 w-[321px] flex-col justify-center items-center flex-shrink-0 rounded-[10px] border-2 border-white bg-transparent text-[#fff] hover:text-[#3FA4E6] hover:bg-white", className)}>
                <div className="text-center text-lg not-italic font-extrabold leading-5 ">
                        {title}
                </div>           
                <div className="text-center not-italic font-medium leading-5 text-[11px] ">
                        {explain}
                </div>
            </div>
        </button>
     
    );
  }
);

OnboardingButton.displayName = "OnboardingButton"

export { OnboardingButton }
