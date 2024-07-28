import { cn } from "@/libs/utils.ts";
import React from "react";


export interface QuestionBoxProps extends React.HTMLAttributes<HTMLDivElement> {
    content: string;
    order: string;
   
  }
  
  const MentorInfo = React.forwardRef<HTMLDivElement, QuestionBoxProps>(
    ({ className, content, order }) => {

        return(
      <>
         <div className={cn("text-[13px] not-italic font-semibold leading-[normal] tracking-[-0.52px]",className)}>
              <div>
                {content}
              </div>

              <div>
                [강연순서]
              </div>

              <div>
                {order}
              </div>
         </div>
              
      </>
    );
  }
);

MentorInfo.displayName = "MentorInfo";

export { MentorInfo };