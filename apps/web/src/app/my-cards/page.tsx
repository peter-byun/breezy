"use client";

import { PageLayout } from "@/layouts/page-layout/PageLayout";
import { TopNavBar } from "@/layouts/nav-bar/TopNavBar";
import {
  DraggableActionCardList,
  OnCardsReorder,
  OnVisibilitySwitchClick,
} from "./components/DraggableActionCardList/DraggableActionCardList";
import { EditCardDialog } from "./components/EditCard/EditCardDialog";
import { useCard } from "@/features/card/useCard";
import { useOverlay } from "@toss/use-overlay";
import { Card, CardId } from "@/features/card/api/type";
import { AddCardButton } from "./components/AddCard/AddCardButton";
import { AddCardDialog } from "./components/AddCard/AddCardDialog";
import { useOpenAlert } from "@/ui-components/alert/useOpenAlert";
import { Alert } from "@/ui-components/alert/Alert";

import { ErrorBoundary } from "@suspensive/react";
import { CardListErrorFallback } from "./components/DraggableActionCardList/CardListErrorFallback";

import { PageBody } from "@/layouts/page-layout/PageBody";
import { css } from "@emotion/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { breezyApiClient } from "@/features/card/api/api";
import { getCardQueryOptions } from "@/features/card/api/queryOptions";
import { arrayMove } from "@dnd-kit/sortable";

export default function MyCards() {
  const { cards, createCard, editCard, deleteCard, memorizeCard, forgetCard } =
    useCard();

  const queryClient = useQueryClient();
  const cardReorderMutation = useMutation({
    mutationFn: ({ id, toIdx }: { id: CardId; toIdx: number }) =>
      breezyApiClient.patch(`/card/${id}/reorder`, {
        toIdx,
      }),
    onMutate: async (requestBody) => {
      await queryClient.cancelQueries(getCardQueryOptions);
      const prevCards = queryClient.getQueryData(getCardQueryOptions.queryKey);

      queryClient.setQueryData(
        getCardQueryOptions.queryKey,
        (oldCards: Card[]) => {
          const cardIdx = oldCards.findIndex(
            (card) => card.id === requestBody.id
          );
          if (typeof cardIdx !== "number") {
            throw Error("Card to reorder does not exist");
          }
          return arrayMove(oldCards, cardIdx, requestBody.toIdx);
        }
      );

      return {
        prevCards,
      };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(
        getCardQueryOptions.queryKey,
        () => context?.prevCards
      );
    },
    onSettled: () => queryClient.invalidateQueries(getCardQueryOptions),
  });
  const handleCardsReorder: OnCardsReorder = (params) => {
    cardReorderMutation.mutate(params);
  };

  const openAlert = useOpenAlert();

  const addCardOverlay = useOverlay();
  const handleAddCardClick = () => {
    addCardOverlay.open(({ isOpen, close }) => (
      <AddCardDialog
        open={isOpen}
        setOpen={(nextOpen) => {
          if (!nextOpen) {
            close();
          }
        }}
        onSubmit={(card) => {
          try {
            createCard(card);
          } catch {
            openAlert((props) => (
              <Alert
                {...props}
                title="Sorry"
                description="An error occurred while creating a card 😢"
                confirmLabel="Okay"
              />
            ));
          }
        }}
      />
    ));
  };

  const editCardOverlay = useOverlay();
  const handleEditClick = (cardId: string) => {
    editCardOverlay.open(({ isOpen, close }) => (
      <EditCardDialog
        open={isOpen}
        setOpen={(nextOpen) => {
          if (!nextOpen) {
            close();
          }
        }}
        onSubmit={(card) => {
          try {
            editCard(cardId, card);
          } catch {
            openAlert((props) => (
              <Alert
                {...props}
                title="Sorry"
                description="An error occurred while updating the card 😢"
                confirmLabel="Okay"
              />
            ));
          }
        }}
      />
    ));
  };

  const handleDeleteClick = (cardId: string) => {
    try {
      deleteCard(cardId);
    } catch {
      openAlert((props) => (
        <Alert
          {...props}
          title="Sorry"
          description="An error occurred while deleting the card 😢"
          confirmLabel="Okay"
        />
      ));
    }
  };

  const handleVisibilityCheckboxClick: OnVisibilitySwitchClick = (
    id,
    checkedState
  ) => {
    if (checkedState === false) {
      memorizeCard(id);
    } else {
      forgetCard(id);
    }
  };

  return (
    <PageLayout
      css={css`
        gap: 20px;
      `}
    >
      <TopNavBar />
      <PageBody>
        <AddCardButton onClick={handleAddCardClick} />
        <ErrorBoundary fallback={<CardListErrorFallback />}>
          <DraggableActionCardList
            cards={cards}
            onCardsReorder={handleCardsReorder}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
            OnVisibilitySwitchClick={handleVisibilityCheckboxClick}
          />
        </ErrorBoundary>
      </PageBody>
    </PageLayout>
  );
}
