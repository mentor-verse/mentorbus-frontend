import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { postOnboardingProps, postOnboardingRes } from "@/types/post";
import { postOnboarding } from "@/apis/postOnboarding";

export function usePostOnboarding(): UseMutationResult<
  postOnboardingRes,
  AxiosError,
  postOnboardingProps
> {
  const queryClient = useQueryClient();

  return useMutation<postOnboardingRes, AxiosError, postOnboardingProps>({
    mutationFn: postOnboarding,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["postOnboarding"],
      });
    },
  });
}
