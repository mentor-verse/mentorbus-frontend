import { AxiosResponse } from "axios";
import { clientAuth } from "@/apis/clients";
import { getQaCountProps, getQaCountRes } from "@/types/get/index";

export const getQaCount = async ({
  questionId,
}: getQaCountProps): Promise<getQaCountRes> => {
  const response: AxiosResponse<getQaCountRes> = await clientAuth({
    url: `/qa/count/${questionId}`,
    method: "get",
  });

  return response.data;
};
