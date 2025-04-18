import {
  BREEZY_API_URL,
  breezyApiClient,
} from "@/features-shared/breezy-api/breezy-api-client";
import { queryOptions } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { USER_CONSTANTS } from "../constants";

export const getUserQueryOptions = () => {
  const accessToken = Cookies.get(USER_CONSTANTS.userAccessToken);

  return queryOptions({
    queryKey: [BREEZY_API_URL, "/user/me", accessToken],
    queryFn: () => breezyApiClient.get("/user/me"),
  });
};
