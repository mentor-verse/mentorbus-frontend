import { getQuestionLike } from "@/apis/getQuestionLike";
import { getQuestionLikeProps, getQuestionLikeRes } from "@/types/get";
import { useQuery } from "@tanstack/react-query";

export const useGetQuestionLike = ({ userId }: getQuestionLikeProps) => {
  return useQuery<getQuestionLikeRes>({
    queryKey: ["getQuestionLike", userId],
    queryFn: () => getQuestionLike({ userId }),
  });
};
