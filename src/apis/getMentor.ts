import { AxiosResponse } from "axios";
import { clientAuth } from "@/apis/clients";
import { getMentorProps, getMentorRes } from "@/types/get/index";

export const getMentor = async ({
  major,
}: getMentorProps): Promise<getMentorRes> => {
  const response: AxiosResponse<getMentorRes> = await clientAuth({
    url: `/mentor`,
    method: "get",
    params: { major },
  });

  return response.data;
};
