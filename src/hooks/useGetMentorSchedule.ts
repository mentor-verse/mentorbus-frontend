import { getMentorSchedule } from "@/apis/getMentorSchedule";
import { getMentorScheduleProps, getMentorScheduleRes } from "@/types/get";
import { useQuery } from "@tanstack/react-query";

export const useGetMentorSchedule = ({ userId }: getMentorScheduleProps) => {
  return useQuery<getMentorScheduleRes>({
    queryKey: ["getMentorSchedule", userId],
    queryFn: () => getMentorSchedule({ userId }),
  });
};
