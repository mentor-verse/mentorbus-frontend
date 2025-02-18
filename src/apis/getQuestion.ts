import { AxiosResponse } from "axios";
import { clientAuth } from "@/apis/clients";
import { getQuestionProps, getQuestionRes } from "@/types/get/index";

export const getQuestion = async ({
  q,
  category,
}: getQuestionProps): Promise<getQuestionRes> => {
  const response: AxiosResponse<getQuestionRes> = await clientAuth({
    url: `/question`,
    method: "get",
    params: { q, category },
  });

  return response.data;
};
