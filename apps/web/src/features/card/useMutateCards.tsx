"use client";

import { isNil } from "es-toolkit";
import { breezyApiClient } from "../../features-shared/breezy-api/breezy-api-client";
import { getCardQueryOptions } from "./api/queryOptions";
import { Card, CardId } from "./api/type";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useOpenToast } from "@/ui-components/toast/useOpenToast";
import { Toast } from "@/ui-components/toast/Toast";

export const useMutateCard = () => {
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

  const openToast = useOpenToast();

  const deleteCardMutation = useMutation({
    mutationFn: (id: CardId) => {
      return breezyApiClient.delete(`/card/${id}`);
    },
    onMutate: async (cardId) => {
      await queryClient.cancelQueries(getCardQueryOptions);

      const prevCards = queryClient.getQueryData<Card[]>(
        getCardQueryOptions.queryKey
      );
      if (isNil(prevCards)) {
        return { prevCards };
      }

      queryClient.setQueryData(getCardQueryOptions.queryKey, () => {
        return prevCards.filter((card) => card.id !== cardId);
      });

      return {
        prevCards,
      };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(
        getCardQueryOptions.queryKey,
        () => context?.prevCards
      );
      openToast((props) => (
        <Toast {...props} title="An error occurred while deleting a card." />
      ));
    },
  });
  const deleteCard = async (id: CardId) => {
    deleteCardMutation.mutate(id);
  };

  return {
    memorizeCard,
    forgetCard,
    createCard,
    editCard,
    deleteCard,
  };
};
