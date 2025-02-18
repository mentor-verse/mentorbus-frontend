import { delQuestionUnlike } from "@/apis/delQuestionUnlike";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

export function useDelQuestionUnlike(): UseMutationResult<
  AxiosResponse,
  AxiosError,
  { userId: number; questionId: number }
> {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, questionId }) =>
      delQuestionUnlike(userId, questionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["delQuestionUnlike"] });
    },
  });
}
