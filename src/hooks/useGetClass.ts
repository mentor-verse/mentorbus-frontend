import { getClass } from "@/apis/getClass";
import { getClassProps, getClassRes } from "@/types/get";
import { useQuery } from "@tanstack/react-query";

export const useGetClass = ({
  take,
  major,
  job,
  userId,
  classId,
}: getClassProps) => {
  return useQuery<getClassRes>({
    queryKey: ["getClass", take, major, job, userId, classId],
    queryFn: () => getClass({ take, major, job, userId, classId }),
  });
};
