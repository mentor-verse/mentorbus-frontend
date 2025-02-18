import * as React from "react";
import { cn } from "../../../libs/utils.ts";
import { SmallMentorProfile } from "../../../components/ui/smallmentorprofile.tsx";

import axios from "axios";

export interface CommentSectionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  mentor_answer: string;
  star_num: number;
  comment_num: number;
  onStarClick?: (starred: boolean, star_num: number) => void;
}

const CommentSection = React.forwardRef<HTMLDivElement, CommentSectionProps>(
  ({ className, mentor_answer }, ref) => {
    const [letter_id, setLetterId] = React.useState<string | null>(null); // kakaoId 상태값으로 설정
    const [comment_id, setCommentId] = React.useState<string | null>(null); // kakaoId 상태값으로 설정

    React.useEffect(() => {
      const searchParams = new URLSearchParams(location.search);
      const urlLetterId = searchParams.get("letter_id"); // URL에서 letter_id 파라미터로 kakaoId 추출
      console.log("urlLetterId", urlLetterId);
      setLetterId(urlLetterId); // 상태 업데이트
    }, [location.search]); // Make sure to listen to location.search to handle URL changes

    // letter_id가 업데이트될 때 실행
    React.useEffect(() => {
      if (letter_id) {
        console.log("letter_id_find", letter_id);
      }
    }, [letter_id]); // Add letter_id as a dependency to trigger when it's updated

    React.useEffect(() => {
      if (letter_id) {
        axios
          .get(
            `https://port-0-mentorbus-backend-m0zjsul0a4243974.sel4.cloudtype.app/comments/${letter_id}`
          )
          .then((response) => {
            setCommentId(response.data);
            console.log("Comment data:", response.data);
          })
          .catch((error) => {
            console.error("Error fetching comment data:", error);
          });
      }
    }, [letter_id]); // letter_id가 변경될 때만 실행

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
              name={
                Array.isArray(comment_id) && comment_id.length > 0
                  ? comment_id[0]?.userName
                  : "편유나 멘토"
              }
              belong={
                Array.isArray(comment_id) && comment_id.length > 0
                  ? comment_id[0]?.position
                  : "숭실대학교"
              }
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
          ></div>
        </div>
      </div>
    );
  }
);

CommentSection.displayName = "CommentSection";

export { CommentSection };
