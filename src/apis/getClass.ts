import { AxiosResponse } from "axios";
import { clientAuth } from "@/apis/clients";
import { getClassProps, getClassRes } from "@/types/get/index";

export const getClass = async ({
  take,
  major,
  job,
  userId,
  classId,
}: getClassProps): Promise<getClassRes> => {
  const response: AxiosResponse<getClassRes> = await clientAuth({
    url: `/class`,
    method: "get",
    params: { take, major, job, userId, classId },
  });

  return response.data;
};
