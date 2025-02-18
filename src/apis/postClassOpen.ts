import { AxiosResponse } from "axios";
import { clientAuth } from "@/apis/clients";
import { postClassOpenProps, postClassOpenRes } from "@/types/post/index";

export const postClassOpen = async ({
  userId,
  userName,
  title,
  content,
  date,
  memberCount,
  map,
  job,
  major,
}: postClassOpenProps): Promise<postClassOpenRes> => {
  const response: AxiosResponse<postClassOpenRes> = await clientAuth({
    url: `/class/open`,
    method: "post",
    data: {
      userId,
      userName,
      title,
      content,
      date,
      memberCount,
      map,
      job,
      major,
    },
  });

  return response.data;
};
