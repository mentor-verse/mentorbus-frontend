import { AxiosResponse } from "axios";
import { clientAuth } from "@/apis/clients";
import {
  getMentorScheduleProps,
  getMentorScheduleRes,
} from "@/types/get/index";

export const getMentorSchedule = async ({
  userId,
}: getMentorScheduleProps): Promise<getMentorScheduleRes> => {
  const response: AxiosResponse<getMentorScheduleRes> = await clientAuth({
    url: `/mentor/schedule/${userId}`,
    method: "get",
  });

  return response.data;
};
