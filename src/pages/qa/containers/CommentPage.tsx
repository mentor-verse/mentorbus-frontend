import * as React from "react";
import { cn } from "../../../libs/utils.ts";
import { CommentQuestionSection } from "./CommentQuestionSection.tsx";
import { CommentSection } from "./CommentSection.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import { LeftArrow } from "@/components/Icons/LeftArrow.tsx";
import BottomNav from "@/containers/navbar.tsx";
import { ApplyAnswerBox } from "@/pages/qa/containers/ApplyAnswerBox.tsx";
import axios from "axios";

export interface CommentPageProps extends React.HTMLAttributes<HTMLDivElement> {
  Link: string;
  back_disable: string;
  back_work: string;
}

const CommentPage = React.forwardRef<HTMLDivElement, CommentPageProps>(
  ({ className, back_disable, back_work, Link }, ref) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [letter_id, setLetterId] = React.useState<string | null>(null); // kakaoId 상태값으로 설정
    const [comment_id, setCommentId] = React.useState<string | null>(null); // kakaoId 상태값으로 설정
    const [mentor_answer, setMentorAnswer] = React.useState(false); // kakaoId 상태값으로 설정

    // Extract userName and idx from the query parameters or state
    const userName = localStorage.getItem("userName") || "기본명"; // Default value if userName is null

    // QAPage로부터 전달받은 state에서 데이터 추출
    const { title, question, star_num, comment_num, position } =
      location.state || {};

    // Get the user's position from localStorage

    const handleBackClick = () => {
      if (back_work === "no") {
        return;
      }

      if (Link) {
        navigate(Link);
      } else {
        window.history.back();
      }
    };

    // URL에서 kakaoId를 가져오는 함수
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
            setMentorAnswer(true);
          })
          .catch((error) => {
            console.error("Error fetching comment data:", error);
            setMentorAnswer(false);
          });
      }
    }, [letter_id]); // letter_id가 변경될 때만 실행

    return (
      <div className={cn("grid place-items-center", className)} ref={ref}>
        <div className="flex items-center justify-between w-full text-lg not-italic font-bold text-[19px] mt-[20px]">
          {!back_disable && (
            <a className="ml-[20px]" onClick={handleBackClick}>
              <LeftArrow />
            </a>
          )}
          <div className="text-lg not-italic font-bold text-[19px] mr-[5px]">
            고민버스
          </div>
          <div className="text-[16px] text-[#333333] font-medium mr-[20px] cursor-pointer"></div>
        </div>

        <div className="flex text-start justify-start items-start w-[90%] mt-[20px]">
          <CommentQuestionSection
            answer={question || "기본 답변"}
            question={title || "기본 질문"}
            star_num={star_num || 0}
            comment_num={comment_num || 0}
          />
        </div>

        {mentor_answer && Array.isArray(comment_id) // comment_id가 배열일 경우만 map 실행
          ? comment_id.map(
              (
                comment: {
                  content: string;
                  replyCount: string;
                },
                index: React.Key | null | undefined
              ) => (
                <CommentSection
                  key={index}
                  mentor_answer={comment.content} // 각 댓글의 replyCount를 표시
                  star_num={0}
                  comment_num={0}
                />
              )
            )
          : position !== "멘티" && (
              <>
                <div className="mt-[25px]"></div>
                <ApplyAnswerBox name={userName} gen={"woman"} />
              </>
            )}

        <BottomNav />
      </div>
    );
  }
);

CommentPage.displayName = "CommentPage";

export { CommentPage };
