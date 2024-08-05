// src/hooks/useUser.ts
import { useQuery } from "react-query";
import { getStoredUserData } from "../utils/auth";
import { clearStoredUserData } from "../utils/auth";

const useUser = () => {
  return useQuery("user", async () => getStoredUserData(), {
    initialData: getStoredUserData,
    onSuccess: (data) => {
      if (!data) {
        clearStoredUserData();
      }
    },
  });
};

export default useUser;
