// apis/postAppleData.ts
import { AxiosResponse } from "axios";
import { clientAuth } from "@/apis/clients";
import { postAppleProps, postAppleRes } from "@/types/post/index";

export const postAppleData = async ({
  user,
  authorization,
}: postAppleProps): Promise<postAppleRes> => {
  // user 객체에서 이름을 결합 (예: "강우현")
  const fullName = `${user.name.lastName}${user.name.firstName}`;

  const response: AxiosResponse<postAppleRes> = await clientAuth({
    url: `/apple/auth`,
    method: "post",
    data: {
      name: fullName,
      email: user.email,
      id_token: authorization.id_token,
    },
  });

  return response.data;
};
