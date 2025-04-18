import { UserLoginResponse } from "./api/type";

import { breezyApiClient } from "../breezy-api/breezy-api-client";

export const logout = async () => {
  const { data } =
    await breezyApiClient.post<UserLoginResponse>("/user/logout");
  if (!data.succeeded) {
    throw Error("Failed to logout");
  }

  return { succeeded: true };
};
