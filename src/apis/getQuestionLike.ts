import { AxiosResponse } from "axios";
import { clientAuth } from "@/apis/clients";
import { getQuestionLikeProps, getQuestionLikeRes } from "@/types/get/index";

export const getQuestionLike = async ({
  userId,
}: getQuestionLikeProps): Promise<getQuestionLikeRes> => {
  const response: AxiosResponse<getQuestionLikeRes> = await clientAuth({
    url: `/question/like/${userId}`,
    method: "get",
  });

  return response.data;
};
