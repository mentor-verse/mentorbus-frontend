import { AxiosResponse } from "axios";
import { clientAuth } from "@/apis/clients";
import { getClassMyProps, getClassMyRes } from "@/types/get/index";

export const getClassMy = async ({
  userId,
}: getClassMyProps): Promise<getClassMyRes> => {
  const response: AxiosResponse<getClassMyRes> = await clientAuth({
    url: `/class/my/${userId}`,
    method: "get",
  });

  return response.data;
};
