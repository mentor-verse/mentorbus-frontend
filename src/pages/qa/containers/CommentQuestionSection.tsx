import * as React from "react";
import { cn } from "../../../libs/utils.ts";
import { Comment } from "@/components/Icons/Comment";
import { Star } from "@/components/Icons/Star";

export interface CommentQuestionSectionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  answer: string;
  question: string;
  star_num: number;
  comment_num: number;
  onStarClick?: (starred: boolean, star_num: number) => void;
}

const CommentQuestionSection = React.forwardRef<
  HTMLDivElement,
  CommentQuestionSectionProps
>(
  (
    { className, question, answer, star_num, comment_num, onStarClick },
    ref
  ) => {
    const [stars, setStars] = React.useState(star_num);
    const [starred, setStarred] = React.useState(false);

    const handleStarClick = () => {
      const newStarred = !starred;
      const newStars = newStarred ? stars + 1 : stars - 1;
      setStars(newStars);
      setStarred(newStarred);
      if (onStarClick) {
        onStarClick(newStarred, newStars); 
      }
    };

    return (
      <div
        className={cn(
          "item-start text-start  ml-[20px] mt-[40px] w-[90%]",
          className
        )}
        ref={ref}
      >
        <div className="flex text-[18px] font-semibold">
          <p className="text-[#4E98EE] mr-[5px]">Q. </p>
          <p>{question}</p>
        </div>
        <div className="text-[11px] font-normal py-3 w-full">{answer}</div>
        <div className={cn("flex text-start items-center mt-[4px]", className)}>
          <div
            className="flex text-start items-center text-blue-500 not-italic font-normal text-[11px]"
            onClick={handleStarClick}
            style={{ cursor: "pointer" }} // Add cursor style to indicate it's clickable
          >
            <Star fill={"#fff"} />
            <div className="ml-[2px]"></div>
            <div>{stars}</div>
          </div>
          <div className="flex text-start items-center text-gray-600 not-italic font-normal text-[11px] ml-[5px]">
            <Comment />
            <div className="ml-[2px]"></div>
            <div>{comment_num}</div>
          </div>
        </div>
      </div>
    );
  }
);

CommentQuestionSection.displayName = "CommentQuestionSection";

export { CommentQuestionSection };
