import { AxiosResponse } from "axios";
import { clientAuth } from "@/apis/clients";
import { postClassApplyProps, postClassApplyRes } from "@/types/post/index";

export const postClassApply = async ({
  userId,
  classId,
}: postClassApplyProps): Promise<postClassApplyRes> => {
  const response: AxiosResponse<postClassApplyRes> = await clientAuth({
    url: `/class/apply`,
    method: "post",
    data: {
      userId,
      classId,
    },
  });

  return response.data;
};
