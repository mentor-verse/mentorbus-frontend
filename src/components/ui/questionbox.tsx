import * as React from "react";
import { cn } from "@/libs/utils.ts";
import { Comment } from "@/components/Icons/Comment";
import { Star } from "@/components/Icons/Star";

export interface QuestionBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  question: string;
  answer: string;
  star_num: number;
  comment_num: number;
  star_color: string;
  onStarClick?: (starred: boolean, star_num: number) => void;
}

const QuestionBox = React.forwardRef<HTMLDivElement, QuestionBoxProps>(
  (
    {
      className,
      question,
      answer,
      star_num,
      comment_num,
      onStarClick,
      star_color,
    },
    ref
  ) => {
    return (
      <div ref={ref} className={cn("text-start items-center", className)}>
        <div
          className={cn(
            "flex text-xs not-italic font-semibold text-[13px]",
            className
          )}
        >
          <p className="text-[#4E98EE] mr-[5px]">Q. </p>
          <div>{question}</div>
        </div>
        <div className="not-italic font-normal text-[11px] w-[300px] mt-[4px]">
          {answer}
        </div>
        <div className={cn("flex text-start items-center mt-[4px]", className)}>
          <div
            className="flex text-start items-center text-blue-500 not-italic font-normal text-[11px]"
            onClick={(e) => {
              e.stopPropagation(); // 부모의 클릭 이벤트 전파 차단
              onStarClick(e); // 별 클릭 핸들러 실행
            }}
            style={{ cursor: "pointer" }} // Add cursor style to indicate it's clickable
          >
            <Star fill={star_color} />
            <div className="ml-[2px]"></div>
            {star_num}
          </div>
          <div className="flex text-start items-center text-gray-600 not-italic font-normal text-[11px] ml-[5px]">
            <Comment />
            <div className="ml-[2px]"></div>
            {comment_num}
          </div>
        </div>
      </div>
    );
  }
);

QuestionBox.displayName = "QuestionBox";

export { QuestionBox };
