import { getClassMy } from "@/apis/getClassMy";
import { getClassMyProps, getClassMyRes } from "@/types/get";
import { useQuery } from "@tanstack/react-query";

export const useGetClassMy = ({ userId }: getClassMyProps) => {
  return useQuery<getClassMyRes>({
    queryKey: ["getClassMy", userId],
    queryFn: () => getClassMy({ userId }),
  });
};
