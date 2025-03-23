"use client";
import { CardBox } from "@/features/card/CardBox";
import { useCard } from "@/features/card/useCard";
import styled from "styled-components";

export default function Home() {
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

  return (
    <PageLayout>
      <CardsStack>
        {cardsToShow.map((card, idx) => (
          <CardBox
            key={card.title}
            card={card}
            zIndex={getCardZIndex(idx)}
            onMemorized={(card) => {
              memorizeCard(card);
            }}
            onForgot={(card) => {
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

const PageLayout = styled.main`
  width: 100%;
  height: 100%;

  gap: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

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
