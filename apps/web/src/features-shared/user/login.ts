import { UserLoginResponse } from "./api/type";
import { breezyApiClient } from "../breezy-api/breezy-api-client";

export const login = async () => {
  const { data } = await breezyApiClient.post<UserLoginResponse>("/user/login");
  if (!data.succeeded) {
    throw Error("Failed to login");
  }

  return { succeeded: true };
};
