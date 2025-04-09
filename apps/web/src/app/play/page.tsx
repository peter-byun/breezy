"use client";
import { FlipCard, FlipCardRef } from "@/app/play/components/FlipCard/FlipCard";
import { useCard } from "@/features/card/useCard";
import { PageLayout } from "@/layouts/page-layout/PageLayout";
import { TopNavBar } from "@/layouts/nav-bar/TopNavBar";

import { useEffect, useState } from "react";
import { filterMemorizedCards } from "@/features/card/helpers/filterMemorizedCards";

import { css } from "@emotion/react";
import { PageBody } from "@/layouts/page-layout/PageBody";
import { CardStackLayout } from "./components/CardStack/CardStackLayout";
import { CardStackProgress } from "./components/CardStack/CardStackProgress";
import { useOpenToast } from "@/ui-components/toast/useOpenToast";
import { Toast } from "@/ui-components/toast/Toast";
import { ErrorBoundary } from "@suspensive/react";
import { CardStackErrorFallback } from "./components/CardStack/CardStackErrorFallback";

export default function Play() {
  const { cards, memorizeCard, moveCardToBottom } = useCard();

  const [cardsToShow, setCardsToShow] = useState(filterMemorizedCards(cards));
  useEffect(() => {
    setCardsToShow(filterMemorizedCards(cards));
  }, [cards]);

  const hideCard = (cardRef: FlipCardRef) => {
    return cardRef.current?.animate(
      [
        {
          opacity: 1,
        },
        {
          opacity: 0,
        },
      ],
      {
        duration: 100,
        iterations: 1,
      }
    ).finished;
  };

  const resetCards = () => {
    setCardsToShow(filterMemorizedCards(cards));
  };

  const getCardZIndex = (idx: number) => {
    if (idx === 0) {
      return 2;
    }
    if (idx === 1) {
      return 1;
    }
    return 0;
  };

  const openToast = useOpenToast();

  return (
    <PageLayout>
      <TopNavBar />
      <PageBody
        css={css`
          justify-content: center;
          row-gap: 20px;
        `}
      >
        <ErrorBoundary fallback={<CardStackErrorFallback />}>
          <CardStackLayout>
            {cardsToShow.map((card, idx) => (
              <FlipCard
                key={card.title}
                card={card}
                zIndex={getCardZIndex(idx)}
                onSwipeLeft={(card, ref) => {
                  try {
                    hideCard(ref)?.then(() => {
                      if (ref.current?.style) {
                        ref.current.style.opacity = "0";
                        memorizeCard(card.id);
                      }
                    });
                  } catch {
                    openToast((props) => (
                      <Toast
                        {...props}
                        title="Failed to mark a card as memorized."
                      />
                    ));
                  }
                }}
                onSwipeRight={(card) => {
                  try {
                    moveCardToBottom(card.id);
                  } catch {
                    openToast((props) => (
                      <Toast
                        {...props}
                        title="Failed to move a card to the bottom of a stack."
                      />
                    ));
                  }
                }}
              >
                {card.title}
              </FlipCard>
            ))}
          </CardStackLayout>
          <CardStackProgress.Layout>
            {cardsToShow.length === 0 ? (
              <CardStackProgress.StartOverButton onClick={resetCards} />
            ) : (
              <CardStackProgress.Count>
                {cardsToShow.length} Cards left
              </CardStackProgress.Count>
            )}
          </CardStackProgress.Layout>
        </ErrorBoundary>
      </PageBody>
    </PageLayout>
  );
}
