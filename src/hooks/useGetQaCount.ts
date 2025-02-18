import { getQaCount } from "@/apis/getQaCount";
import { getQaCountProps, getQaCountRes } from "@/types/get";
import { useQuery } from "@tanstack/react-query";

export const useGetQaCount = ({ questionId }: getQaCountProps) => {
  return useQuery<getQaCountRes>({
    queryKey: ["getQaCount", questionId],
    queryFn: () => getQaCount({ questionId }),
  });
};
