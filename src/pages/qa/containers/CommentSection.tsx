import * as React from "react";
import { cn } from "../../../libs/utils.ts";
import { SmallMentorProfile } from "../../../components/ui/smallmentorprofile.tsx";
import { Good } from "@/components/Icons/Comment.tsx";
import { Comment } from "@/components/Icons/Comment";

export interface CommentSectionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  mentor_answer: string;
  star_num: number;
  comment_num: number;
  onStarClick?: (starred: boolean, star_num: number) => void;
}

const CommentSection = React.forwardRef<HTMLDivElement, CommentSectionProps>(
  ({ className, mentor_answer, star_num, comment_num, onStarClick }, ref) => {
    const [stars, setStars] = React.useState(star_num);
    const [starred, setStarred] = React.useState(false);

    const handleStarClick = () => {
      const newStarred = !starred;
      const newStars = newStarred ? stars + 1 : stars - 1;
      setStars(newStars);
      setStarred(newStarred);
      if (onStarClick) {
        onStarClick(newStarred, newStars); // 현재 상태와 새로운 stars 값을 전달
      }
    };

    const userName = localStorage.getItem("userName");
    const belong = localStorage.getItem("userName");

    return (
      <div
        className={cn(
          "w-[90%] h-auto align-middle item-start border-[0.6px] border-[#D5D5D5] rounded-[16px]  mt-[30px]",
          className
        )}
        ref={ref}
      >
        <div className="py-4">
          <div className="ml-[30px]">
            <SmallMentorProfile
              name={userName || "편유나 멘토"}
              belong={belong || "숭실대학교"}
              gen={"woman"}
            />
          </div>
          <div
            className="font-normal text-[12px] w-[80%] h-auto py-3 ml-[30px] text-start"
            style={{ whiteSpace: "pre-line" }}
          >
            {mentor_answer}
          </div>
          <div
            className={cn(
              "flex text-start items-center mt-[4px] ml-[30px]",
              className
            )}
          >
            <div
              className="flex text-start items-center justify-center text-blue-500 not-italic font-normal text-[11px] border-[0.4px] border-[#CCCCCC] w-[43px] py-1 rounded-[50px]"
              onClick={handleStarClick}
              style={{ cursor: "pointer" }} // Add cursor style to indicate it's clickable
            >
              <Good />
              <div className="ml-[2px]"></div>
              {stars}
            </div>
            <div className="flex text-start items-center  justify-center text-gray-600 not-italic font-normal text-[11px] ml-[5px] border-[0.4px] border-[#CCCCCC] w-[43px] py-1 rounded-[50px]">
              <Comment />
              <div className="ml-[2px]"></div>
              {comment_num}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

CommentSection.displayName = "CommentSection";

export { CommentSection };
