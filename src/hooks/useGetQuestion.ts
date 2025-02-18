import { getQuestion } from "@/apis/getQuestion";
import { getQuestionProps, getQuestionRes } from "@/types/get";
import { useQuery } from "@tanstack/react-query";

export const useGetQuestion = ({ q, category }: getQuestionProps) => {
  return useQuery<getQuestionRes>({
    queryKey: ["getQuestion", q, category],
    queryFn: () => getQuestion({ q, category }),
  });
};
