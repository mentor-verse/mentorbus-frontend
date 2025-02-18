import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { postQuestionProps, postQuestionRes } from "@/types/post";
import { postQuestion } from "@/apis/postQuestion";

export function usePostQuestion(): UseMutationResult<
  postQuestionRes,
  AxiosError,
  postQuestionProps
> {
  const queryClient = useQueryClient();

  return useMutation<postQuestionRes, AxiosError, postQuestionProps>({
    mutationFn: postQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["postQuestion"],
      });
    },
  });
}
