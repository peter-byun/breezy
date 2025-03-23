import { useState } from "react";
import { Card } from "./api/type";
import { dummyCards } from "./api/dummy";
const sortedDummyCards = sortCards(dummyCards);

export const useCard = () => {
  // TODO: Fetch it from the backend
  const [cards, setCards] = useState<Card[]>(sortedDummyCards);

  const cardsToShow = cards.filter((card) => !card.memorized);

  const createCard = (card: Card) => {
    setCards([...cards, card]);
  };

  const memorizeCard = (card: Card) => {
    setCards(
      cards.map((temp) =>
        temp.title === card.title
          ? { ...temp, memorized: true, memorizedAt: Date.now() }
          : temp
      )
    );
  };

  const forgetCard = (card: Card) => {
    const cardIdxToForget = cards.findIndex((c) => c.title === card.title);

    const nextCards = [...cards];
    nextCards.splice(cardIdxToForget, 1);
    nextCards.push(card);

    setCards(nextCards);
  };

  const resetCards = () => {
    setCards([...sortedDummyCards]);
  };

  return {
    cards,
    cardsToShow,
    createCard,
    memorizeCard,
    forgetCard,
    resetCards,
  };
};

function sortCards(cards: Card[]) {
  return [...cards].sort((a, b) => a.order - b.order);
}
