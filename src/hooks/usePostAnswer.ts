import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { postAnswer } from "@/apis/postAnswer";
import { postAnswerProps, postAnswerRes } from "@/types/post";

export function usePostAnswer(): UseMutationResult<
  postAnswerRes,
  AxiosError,
  postAnswerProps
> {
  const queryClient = useQueryClient();

  return useMutation<postAnswerRes, AxiosError, postAnswerProps>({
    mutationFn: postAnswer,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["postAnswer"],
      });
    },
  });
}
