import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { postClassOpenProps, postClassOpenRes } from "@/types/post";
import { postClassOpen } from "@/apis/postClassOpen";

export function usePostClassOpen(): UseMutationResult<
  postClassOpenRes,
  AxiosError,
  postClassOpenProps
> {
  const queryClient = useQueryClient();

  return useMutation<postClassOpenRes, AxiosError, postClassOpenProps>({
    mutationFn: postClassOpen,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["postClassOpen"],
      });
    },
  });
}
