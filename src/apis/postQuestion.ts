import { AxiosResponse } from "axios";
import { clientAuth } from "@/apis/clients";
import { postQuestionProps, postQuestionRes } from "@/types/post/index";

export const postQuestion = async ({
  userId,
  title,
  content,
}: postQuestionProps): Promise<postQuestionRes> => {
  const response: AxiosResponse<postQuestionRes> = await clientAuth({
    url: `/question`,
    method: "post",
    data: {
      userId,
      title,
      content,
    },
  });

  return response.data;
};
