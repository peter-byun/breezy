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

  const moveCardToBottom = (id: CardId) => {
    const lastIdx = cards.length - 1;
    const toIdx = lastIdx < 0 ? 0 : lastIdx;

    breezyApiClient.patch(`/card/${id}/reorder`, {
      toIdx,
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
    moveCardToBottom,
    createCard,
    editCard,
    deleteCard,
  };
};
