import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { postQuestionLikesProps, postQuestionLikesRes } from "@/types/post";
import { postQuestionLikes } from "@/apis/postQuestionLike";

export function usePostQuestionLikes(): UseMutationResult<
  postQuestionLikesRes,
  AxiosError,
  postQuestionLikesProps
> {
  const queryClient = useQueryClient();

  return useMutation<postQuestionLikesRes, AxiosError, postQuestionLikesProps>({
    mutationFn: postQuestionLikes,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["postQuestionLikes"],
      });
    },
  });
}
