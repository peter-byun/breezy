import { useState } from "react";
import { Card } from "./api/type";
import { dummyCards } from "./api/dummy";

export const useCard = () => {
  const [cards, setCards] = useState<Card[]>(dummyCards);

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

  return { cards, memorizeCard, createCard };
};
