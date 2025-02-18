import * as React from "react";
import { cn } from "../../../libs/utils.ts";
import { CommentQuestionSection } from "./CommentQuestionSection.tsx";
import { CommentSection } from "./CommentSection.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import { LeftArrow } from "@/components/Icons/LeftArrow.tsx";
import BottomNav from "@/containers/navbar.tsx";
import { ApplyAnswerBox } from "@/pages/qa/containers/ApplyAnswerBox.tsx";
import { useGetAnswer } from "@/hooks/useGetAnswer.ts";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getAnswerRes } from "@/types/get/index.ts";

export interface CommentPageProps extends React.HTMLAttributes<HTMLDivElement> {
  Link: string;
  back_disable: string;
  back_work: string;
}

const CommentPage = React.forwardRef<HTMLDivElement, CommentPageProps>(
  ({ className, back_disable, back_work, Link }, ref) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [questionId, setQuestionId] = useState<number | null>(null);
    const [commentIds, setCommentIds] = useState<
      Array<{
        content: string;
        replyCount: string;
      }>
    >([]);
    const [mentorAnswer, setMentorAnswer] = useState<getAnswerRes[]>([]);

    const userName = localStorage.getItem("userName") || "기본명";
    const queryClient = useQueryClient();
    const localUserId = localStorage.getItem("userId");

    const { title, question, star_num, comment_num, position } =
      location.state || {};

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

    useEffect(() => {
      const searchParams = new URLSearchParams(location.search);
      const urlQuestionId = searchParams.get("questionId");
      const parsedQuestionId = urlQuestionId ? Number(urlQuestionId) : null;
      if (!isNaN(parsedQuestionId)) {
        setQuestionId(parsedQuestionId);
      }
    }, [location.search]);

    const {
      data: resp,
      isLoading,
      isError,
      refetch,
    } = useGetAnswer({ questionId });

    useEffect(() => {
      if (!queryClient.getQueryData(["getComment"])) {
        refetch();
      }
    }, [queryClient, refetch]);

    useEffect(() => {
      setMentorAnswer(resp || []);
      setCommentIds(
        resp?.map((answer) => ({
          content: answer.content || "No content",
          replyCount: answer.replyCount || "0",
        })) || []
      );
    }, [resp]);

    // 전체 resp 배열에서 로컬 userId와 일치하는 항목이 있는지 확인
    const isOwner =
      resp && resp.some((answer) => String(answer.userId) === localUserId);

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading articles</p>;

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

        {commentIds &&
          Array.isArray(commentIds) &&
          commentIds.length > 0 &&
          commentIds.map((comment, index) => (
            <CommentSection
              key={index}
              mentor_answer={comment.content}
              star_num={0}
              comment_num={parseInt(comment.replyCount)}
            />
          ))}

        {/* 전체 resp 배열에 로컬 userId가 포함되지 않은 경우 ApplyAnswerBox 렌더링 */}
        {!isOwner && position !== "멘티" && (
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
