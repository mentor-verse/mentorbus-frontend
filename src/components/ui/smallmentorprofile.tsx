import * as React from "react"
import { cn } from "@/libs/utils.ts"
import { SmallWoman } from "@/components/Icons/SmallWoman"    
import { SmallMan } from "@/components/Icons/SmallMan"    

export interface SmallMentorProfileProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  belong: string;
  gen: string;
}

const SmallMentorProfile = React.forwardRef<HTMLDivElement, SmallMentorProfileProps>(
  ({ className, name, belong, gen }) => {
    

    return (
      <div className={cn("flex text-start items-center", className)}>
           <div className={gen}>
                 {gen === 'man' ? <SmallMan /> : <SmallWoman />}
           </div>           
           <div className="ml-[10px]">
                 <div className="text-xs not-italic font-semibold">{name}</div>
                 <div className="not-italic font-normal text-[11px]">{belong}</div>
           </div>
      </div>
    );
  }
);

SmallMentorProfile.displayName = "SmallMentorProfile"

export { SmallMentorProfile }
