import { patchClassStatus } from "@/apis/patchClassStatus";
import { patchClassStatusProps, patchClassStatusRes } from "@/types/patch";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const usePatchClassStatus = () => {
  const queryClient = useQueryClient();
  return useMutation<patchClassStatusRes, Error, patchClassStatusProps>({
    mutationFn: (patchData: patchClassStatusProps) =>
      patchClassStatus(patchData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patchClassStatus"] });
    },
  });
};
