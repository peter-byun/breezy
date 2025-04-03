import { Card } from "./api/type";

import { cardsAtom } from "./atom/cardsAtom";
import { useAtom } from "jotai";

type CardId = Card["id"];

export const useCard = () => {
  // TODO: Fetch it from the backend

  const [cards, setCards] = useAtom(cardsAtom);

  const createCard = (card: Pick<Card, "title" | "content">) => {
    const newCardDefaultProps: Omit<Card, "title" | "content"> = {
      order: cards.length + 1,
      id: String(cards.length + 1),
      memorized: false,
      createdAt: Date.now() - 1000 * 60 * 60 * 2,
      memorizedAt: 0,
    };

    const newCard: Card = {
      ...newCardDefaultProps,
      ...card,
    };

    setCards([...cards, newCard]);
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

  const editCard = (id: CardId, card: Pick<Card, "title" | "content">) => {
    const cardIdxToEdit = cards.findIndex((c) => c.id === id);

    const cardToEdit: Card = {
      ...cards[cardIdxToEdit],
      title: card.title,
      content: card.content,
    };

    const nextCards = [...cards];
    nextCards.splice(cardIdxToEdit, 1, cardToEdit);

    setCards(nextCards);
  };

  const deleteCard = (id: CardId) => {
    const cardIdxToForget = cards.findIndex((c) => c.id === id);

    const nextCards = [...cards];
    nextCards.splice(cardIdxToForget, 1);

    setCards(nextCards);
  };

  const resetCards = () => {
    setCards([]);
  };

  return {
    cards,
    setCards,
    memorizeCard,
    forgetCard,
    createCard,
    editCard,
    deleteCard,
    resetCards,
  };
};
