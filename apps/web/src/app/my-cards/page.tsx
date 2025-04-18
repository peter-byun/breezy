"use client";

import { PageLayout } from "@/layouts/page-layout/PageLayout";
import { TopNavBar } from "@/features-shared/top-nav-bar/TopNavBar";
import { AddCardButton } from "./components/AddCard/AddCardButton";
import { useOpenAlert } from "@/ui-components/alert/useOpenAlert";
import { Alert } from "@/ui-components/alert/Alert";

import { ErrorBoundary, Suspense } from "@suspensive/react";

import { PageBody } from "@/layouts/page-layout/PageBody";
import { css } from "@emotion/react";
import { useMutateCard } from "@/features/card/useMutateCards";
import { useAddCardModal } from "./components/AddCard/useAddCardModal";
import { useOptimisticReorderCards } from "./components/MyCards/useOptimisticReorderCards";
import { DACardListLoading } from "./components/DraggableActionCardList/DACardListLoading";
import {
  DACardList,
  OnVisibilitySwitchClick,
} from "./components/DraggableActionCardList/DACardList";
import { DACardListError } from "./components/DraggableActionCardList/DACardListError";
import { useEditCardModal } from "./components/EditCard/useEditCardModal";
import { QueryErrorResetBoundary } from "@tanstack/react-query";

export default function MyCards() {
  const optimisticallyReorderCard = useOptimisticReorderCards();

  const addCard = useAddCardModal();

  const editCard = useEditCardModal();

  const { memorizeCard, forgetCard, deleteCard } = useMutateCard();
  const openAlert = useOpenAlert();

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

  return (
    <PageLayout
      css={css`
        gap: 20px;
      `}
    >
      <TopNavBar />
      <PageBody>
        <AddCardButton onClick={addCard} />
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              onReset={reset}
              fallback={({ reset: resetErrorBoundary }) => {
                return <DACardListError onReset={resetErrorBoundary} />;
              }}
            >
              <Suspense fallback={<DACardListLoading />}>
                <DACardList
                  onCardsReorder={optimisticallyReorderCard}
                  onEditClick={editCard}
                  OnVisibilitySwitchClick={handleVisibilityCheckboxClick}
                  onDeleteClick={handleDeleteClick}
                />
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </PageBody>
    </PageLayout>
  );
}
