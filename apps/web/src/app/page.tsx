"use client";
import { CardBox } from "@/features/card/CardBox";
import { useCard } from "@/features/card/useCard";
import styled from "styled-components";

export default function Home() {
  const { cards, memorizeCard } = useCard();

  return (
    <PageLayout>
      <CardsStack>
        {cards.map((card) => (
          <CardBox
            key={card.title}
            card={card}
            onMemorized={(card) => {
              memorizeCard(card);
            }}
          >
            {card.title}
          </CardBox>
        ))}
      </CardsStack>
    </PageLayout>
  );
}

const PageLayout = styled.main`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CardsStack = styled.section`
  background-color: #fdfdfd;
  width: 1000px;
  height: 800px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
