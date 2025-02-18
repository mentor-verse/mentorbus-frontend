import { AxiosResponse } from "axios";
import { clientAuth } from "@/apis/clients";
import { postAppleProps, postAppleRes } from "@/types/post/index";

export const postAppleData = async ({
  name,
  email,
  id_token,
}: postAppleProps): Promise<postAppleRes> => {
  const response: AxiosResponse<postAppleRes> = await clientAuth({
    url: `/apple/auth`,
    method: "post",
    data: {
      name,
      email,
      id_token,
    },
  });

  return response.data;
};
