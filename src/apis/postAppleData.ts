// apis/postAppleData.ts
import { AxiosResponse } from "axios";
import { clientAuth } from "@/apis/clients";
import { postAppleProps, postAppleRes } from "@/types/post/index";

export const postAppleData = async ({
  user,
  authorization,
}: postAppleProps): Promise<postAppleRes> => {
  // 전송할 데이터 객체를 구성 (기본적으로 id_token은 항상 포함)
  const data: {
    name?: string;
    email?: string;
    id_token: string;
  } = {
    id_token: authorization.id_token,
  };

  // user.name이 있고, firstName과 lastName이 존재하면 결합
  if (user?.name && user.name.firstName && user.name.lastName) {
    data.name = `${user.name.lastName}${user.name.firstName}`;
  }

  // email이 존재할 때만 추가
  if (user?.email) {
    data.email = user.email;
  }

  const response: AxiosResponse<postAppleRes> = await clientAuth({
    url: `/apple/auth`,
    method: "post",
    data,
  });

  return response.data;
};
