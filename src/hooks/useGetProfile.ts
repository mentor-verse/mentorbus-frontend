import { getProfile } from "@/apis/getProfile";
import { getProfileProps, getProfileRes } from "@/types/get";
import { useQuery } from "@tanstack/react-query";

export const useGetProfile = (
  { userId }: getProfileProps,
  options?: { enabled: boolean }
) => {
  return useQuery<getProfileRes>({
    queryKey: ["getProfile", userId],
    queryFn: () => getProfile({ userId }),
    enabled: options?.enabled ?? true,
  });
};
