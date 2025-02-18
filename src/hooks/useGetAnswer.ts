import { getAnswer } from "@/apis/getAnswer";
import { getAnswerProps, getAnswerRes } from "@/types/get";
import { useQuery } from "@tanstack/react-query";

export const useGetAnswer = ({ questionId }: getAnswerProps) => {
  return useQuery<getAnswerRes>({
    queryKey: ["getAnswer", questionId],
    queryFn: () => getAnswer({ questionId }),
  });
};
