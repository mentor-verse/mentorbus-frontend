import { AxiosResponse } from "axios";
import { patchClassStatusProps, patchClassStatusRes } from "@/types/patch";
import { clientAuth } from "./clients";

export const patchClassStatus = async ({
  userId,
  classId,
  isFinished,
}: patchClassStatusProps): Promise<patchClassStatusRes> => {
  const response: AxiosResponse<patchClassStatusRes> = await clientAuth({
    url: `/class/status`,
    method: "patch",
    data: {
      userId,
      classId,
      isFinished,
    },
  });
  return response.data;
};
