import { clientAuth } from "@/apis/clients";

export async function delQuestionUnlike(
  userId: number,
  questionId: number | null
) {
  const resp = await clientAuth({
    method: "delete",
    url: `/question/unlike `,
    data: {
      userId,
      questionId,
    },
  });
  return resp;
}
