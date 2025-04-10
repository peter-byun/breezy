"use client";

import { breezyApiClient } from "./api/api";
import { getCardQueryOptions } from "./api/queryOptions";
import { Card, CardId } from "./api/type";

import { useSuspenseQuery } from "@tanstack/react-query";

export const useCard = () => {
  const { data: cards } = useSuspenseQuery(getCardQueryOptions);

  const createCard = (card: Pick<Card, "title" | "content">) => {
    breezyApiClient.post("/card", card);
  };

  const memorizeCard = (id: CardId) => {
    breezyApiClient.patch(`/card/${id}/memorized`, {
      memorized: true,
    });
  };
  const forgetCard = (id: CardId) => {
    breezyApiClient.patch(`/card/${id}/memorized`, {
      memorized: false,
    });
  };

  const editCard = (id: CardId, card: Pick<Card, "title" | "content">) => {
    breezyApiClient.patch(`/card/${id}`, card);
  };

  const deleteCard = (id: CardId) => {
    breezyApiClient.delete(`/card/${id}`);
  };

  return {
    cards,
    memorizeCard,
    forgetCard,
    createCard,
    editCard,
    deleteCard,
  };
};
