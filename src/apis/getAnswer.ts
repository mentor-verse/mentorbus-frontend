import { AxiosResponse } from "axios";
import { clientAuth } from "@/apis/clients";
import { getAnswerProps, getAnswerRes } from "@/types/get/index";

export const getAnswer = async ({
  questionId,
}: getAnswerProps): Promise<getAnswerRes> => {
  const response: AxiosResponse<getAnswerRes> = await clientAuth({
    url: `/answer/${questionId}`,
    method: "get",
  });

  return response.data;
};
