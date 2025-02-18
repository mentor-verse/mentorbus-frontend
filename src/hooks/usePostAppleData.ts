// hooks/usePostAppleData.ts
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { postAppleProps, postAppleRes } from "@/types/post";
import { postAppleData } from "@/apis/postAppleData";

export function usePostAppleData(): UseMutationResult<
  postAppleRes,
  AxiosError,
  postAppleProps
> {
  const queryClient = useQueryClient();

  return useMutation<postAppleRes, AxiosError, postAppleProps>({
    mutationFn: postAppleData,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["postAppleData"],
      });
    },
  });
}
