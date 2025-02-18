import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { postClassApplyProps, postClassApplyRes } from "@/types/post";
import { postClassApply } from "@/apis/postClassApply";

export function usePostClassApply(): UseMutationResult<
  postClassApplyRes,
  AxiosError,
  postClassApplyProps
> {
  const queryClient = useQueryClient();

  return useMutation<postClassApplyRes, AxiosError, postClassApplyProps>({
    mutationFn: postClassApply,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["postClassApply"],
      });
    },
  });
}
