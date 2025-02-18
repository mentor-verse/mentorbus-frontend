import { AxiosResponse } from "axios";
import { clientAuth } from "@/apis/clients";
import { postOnboardingProps, postOnboardingRes } from "@/types/post/index";

export const postOnboarding = async ({
  userId,
  userName,
  isMentor,
  job,
  major,
  school,
  interest,
}: postOnboardingProps): Promise<postOnboardingRes> => {
  const response: AxiosResponse<postOnboardingRes> = await clientAuth({
    url: `/onboarding`,
    method: "post",
    data: {
      userId,
      userName,
      isMentor,
      job,
      major,
      school,
      interest,
    },
  });

  return response.data;
};
