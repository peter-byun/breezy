"use client";

import { breezyApiClient } from "./api/api";
import { getCardQueryOptions } from "./api/queryOptions";
import { Card, CardId } from "./api/type";

import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";

export const useCard = () => {
  const { data: cards } = useSuspenseQuery(getCardQueryOptions);

  const queryClient = useQueryClient();
  const createCard = async (card: Pick<Card, "title" | "content">) => {
    await breezyApiClient.post("/card", card);
    queryClient.invalidateQueries(getCardQueryOptions);
  };

  // TODO: For instant feedback, implement optimistic update and error handling with a toast message
  const memorizeCard = async (id: CardId) => {
    await breezyApiClient.patch(`/card/${id}/memorized`, {
      memorized: true,
    });
    queryClient.invalidateQueries(getCardQueryOptions);
  };
  const forgetCard = async (id: CardId) => {
    await breezyApiClient.patch(`/card/${id}/memorized`, {
      memorized: false,
    });
    queryClient.invalidateQueries(getCardQueryOptions);
  };

  const editCard = async (
    id: CardId,
    card: Pick<Card, "title" | "content">
  ) => {
    await breezyApiClient.patch(`/card/${id}`, card);
    queryClient.invalidateQueries(getCardQueryOptions);
  };

  const deleteCard = async (id: CardId) => {
    await breezyApiClient.delete(`/card/${id}`);
    queryClient.invalidateQueries(getCardQueryOptions);
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
