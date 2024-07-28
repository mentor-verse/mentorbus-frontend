import * as React from "react";
import { cn } from "@/libs/utils.ts";
import { Comment } from "@/components/Icons/Comment";    
import { Star } from "@/components/Icons/Star";    

export interface QuestionBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  question: string;
  answer: string;
  star_num: number;
  comment_num: number;
  type: string;
  onStarClick: (starred: boolean, star_num: number) => void; // 새로운 prop 추가
}

const QuestionBox = React.forwardRef<HTMLDivElement, QuestionBoxProps>(
  ({ className, question, answer, star_num, comment_num, onStarClick }) => {
    const [stars, setStars] = React.useState(star_num);
    const [starred, setStarred] = React.useState(false);

    const handleStarClick = () => {
      const newStarred = !starred;
      const newStars = newStarred ? stars + 1 : stars - 1;
      setStars(newStars);
      setStarred(newStarred);
      onStarClick(newStarred, newStars); // 현재 상태와 새로운 stars 값을 전달
    };

    return (
      <div className={cn("text-start items-center", className)}>
        <div className={cn("text-xs not-italic font-semibold text-[13px]", className)}>
          {question}
        </div>
        <div className="not-italic font-normal text-[11px] w-[300px] mt-[4px]">
          {answer}
        </div>
        <div className={cn("flex text-start items-center mt-[4px]", className)}>
          <div
            className="flex text-start items-center text-blue-500 not-italic font-normal text-[11px]"
            onClick={handleStarClick}
            style={{ cursor: 'pointer' }}  // Add cursor style to indicate it's clickable
          >
            <Star />
            <div className="ml-[2px]"></div>
            {stars}
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
