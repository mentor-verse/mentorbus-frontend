import { getProfile } from "@/apis/getProfile";
import { getProfileProps, getProfileRes } from "@/types/get";
import { useQuery } from "@tanstack/react-query";

export const useGetProfile = ({ userId }: getProfileProps) => {
  return useQuery<getProfileRes>({
    queryKey: ["getProfile", userId],
    queryFn: () => getProfile({ userId }),
  });
};
