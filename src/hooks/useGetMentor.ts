import { getMentor } from "@/apis/getMentor";
import { getMentorProps, getMentorRes } from "@/types/get";
import { useQuery } from "@tanstack/react-query";

export const useGetMentor = ({ major }: getMentorProps) => {
  return useQuery<getMentorRes>({
    queryKey: ["getMentor", major],
    queryFn: () => getMentor({ major }),
  });
};
