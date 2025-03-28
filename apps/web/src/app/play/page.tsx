"use client";
import { CardBox, CardBoxRef } from "@/features/card/CardBox/CardBox";
import { useCard } from "@/features/card/useCard";
import { PageLayout } from "@/features/layout/PageLayout";
import { TopNavBar } from "@/features/nav-bar/TopNavBar";
import styled from "styled-components";

export default function Play() {
  const { cardsToShow, memorizeCard, forgetCard, resetCards } = useCard();

  const getCardZIndex = (idx: number) => {
    if (idx === 0) {
      return 2;
    }
    if (idx === 1) {
      return 1;
    }
    return 0;
  };

  const hideCard = (cardRef: CardBoxRef) => {
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
          <CardBox
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
          </CardBox>
        ))}
      </CardsStack>

      <Progress>
        {cardsToShow.length === 0 ? (
          <button onClick={resetCards}>
            <h2>🎉 Congrats! Wanna start over?</h2>
          </button>
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
