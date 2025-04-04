"use client";
import { FlipCard, FlipCardRef } from "@/app/play/components/FlipCard/FlipCard";
import { useCard } from "@/features/card/useCard";
import { PageLayout } from "@/layouts/page-layout/PageLayout";
import { TopNavBar } from "@/layouts/nav-bar/TopNavBar";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { filterMemorizedCards } from "@/features/card/helpers/filterMemorizedCards";
import { Button } from "@radix-ui/themes";
import { css } from "@emotion/react";

export default function Play() {
  const { cards, memorizeCard, forgetCard, resetCards } = useCard();
  const [cardsToShow, setCardsToShow] = useState(filterMemorizedCards(cards));
  useEffect(() => {
    setCardsToShow(filterMemorizedCards(cards));
  }, [cards]);

  const getCardZIndex = (idx: number) => {
    if (idx === 0) {
      return 2;
    }
    if (idx === 1) {
      return 1;
    }
    return 0;
  };

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

  return (
    <PageLayout>
      <TopNavBar />
      <CardsStack>
        {cardsToShow.map((card, idx) => (
          <FlipCard
            key={card.title}
            card={card}
            zIndex={getCardZIndex(idx)}
            onSwipeLeft={(card, ref) => {
              hideCard(ref)?.then(() => {
                if (ref.current?.style) {
                  ref.current.style.opacity = "0";
                  memorizeCard(card);
                }
              });
            }}
            onSwipeRight={(card) => {
              forgetCard(card);
              if (cardsToShow.length === 1) {
                // TODO: Toast - One last card left!💪
              }
            }}
          >
            {card.title}
          </FlipCard>
        ))}
      </CardsStack>

      <Progress>
        {cardsToShow.length === 0 ? (
          <Button
            onClick={resetCards}
            css={css`
              padding: 20px;
              font-size: 20px;
            `}
          >
            🎉 Congrats! Wanna start over?
          </Button>
        ) : (
          <h2>{cardsToShow.length} Cards left</h2>
        )}
      </Progress>
    </PageLayout>
  );
}

const CardsStack = styled.section`
  background-color: transparent;
  min-width: 300px;
  min-height: 300px;
  padding: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Progress = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
