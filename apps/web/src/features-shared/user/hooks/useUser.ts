import { useQuery } from "@tanstack/react-query";
import { getUserQueryOptions } from "../api/getUserQueryOptions";
import { isNotNil } from "es-toolkit";

export const useUser = () => {
  const { data, isSuccess } = useQuery(getUserQueryOptions());

  return {
    isSignedIn: isNotNil(data) && isSuccess,
    user: data,
  };
};
