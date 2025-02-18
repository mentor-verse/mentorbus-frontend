import { AxiosResponse } from "axios";
import { clientAuth } from "@/apis/clients";
import { postAnswerProps, postAnswerRes } from "@/types/post/index";

export const postAnswer = async ({
  userId,
  content,
  questionId,
}: postAnswerProps): Promise<postAnswerRes> => {
  const response: AxiosResponse<postAnswerRes> = await clientAuth({
    url: `/answer`,
    method: "post",
    data: {
      userId,
      content,
      questionId,
    },
  });

  return response.data;
};
