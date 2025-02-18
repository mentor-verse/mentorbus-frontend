import { AxiosResponse } from "axios";
import { clientAuth } from "@/apis/clients";
import {
  postQuestionLikesProps,
  postQuestionLikesRes,
} from "@/types/post/index";

export const postQuestionLikes = async ({
  userId,
  questionId,
}: postQuestionLikesProps): Promise<postQuestionLikesRes> => {
  const response: AxiosResponse<postQuestionLikesRes> = await clientAuth({
    url: `/question/like`,
    method: "post",
    data: {
      userId,
      questionId,
    },
  });

  return response.data;
};
