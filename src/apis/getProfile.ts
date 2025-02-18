import { AxiosResponse } from "axios";
import { clientAuth } from "@/apis/clients";
import { getProfileProps, getProfileRes } from "@/types/get/index";

export const getProfile = async ({
  userId,
}: getProfileProps): Promise<getProfileRes> => {
  const response: AxiosResponse<getProfileRes> = await clientAuth({
    url: `/profile/${userId}`,
    method: "get",
  });

  return response.data;
};
