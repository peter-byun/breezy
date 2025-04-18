import {
  BREEZY_API_URL,
  breezyApiClient,
} from "../../../features-shared/breezy-api/breezy-api-client";
import { Card } from "./type";

export const getCardQueryOptions = {
  queryKey: [BREEZY_API_URL, "/cards"],
  queryFn: () =>
    breezyApiClient.get<Card[]>("/cards").then((res) => {
      return res.data;
    }),
};
