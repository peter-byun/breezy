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
import { useOpenToast } from "@/ui-components/toast/useOpenToast";
import { Toast } from "@/ui-components/toast/Toast";

export default function MyCards() {
  const { cards, createCard, editCard, deleteCard, memorizeCard, forgetCard } =
    useCard();

  const queryClient = useQueryClient();
  const openToast = useOpenToast();
  const cardReorderMutation = useMutation({
    mutationFn: ({
      id,
      toIdx,
    }: {
      id: CardId;
      toIdx: number;
      localCards: Card[];
    }) =>
      breezyApiClient.patch(`/card/${id}/reorder`, {
        toIdx,
      }),
    onMutate: async (requestBody) => {
      await queryClient.cancelQueries(getCardQueryOptions);
      queryClient.setQueryData(getCardQueryOptions.queryKey, () => {
        return requestBody.localCards;
      });
      // Save previous cards to rollback on error
      const prevCards = queryClient.getQueryData(getCardQueryOptions.queryKey);
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
        <Toast {...props} title="An error occurred while moving a card." />
      ));
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
  const handleEditClick = (card: Card) => {
    editCardOverlay.open(({ isOpen, close }) => (
      <EditCardDialog
        currentCard={card}
        open={isOpen}
        setOpen={(nextOpen) => {
          if (!nextOpen) {
            close();
          }
        }}
        onSubmit={(updatedCard) => {
          try {
            editCard(card.id, updatedCard);
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
