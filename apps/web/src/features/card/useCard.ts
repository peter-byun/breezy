import { Card, CardId } from "./api/type";

import { cardsAtom, initialCards } from "./atom/cardsAtom";
import { useAtom } from "jotai";

export const useCard = () => {
  // TODO: Fetch it from the backend

  const [cards, setCards] = useAtom(cardsAtom);

  const createCard = (card: Pick<Card, "title" | "content">) => {
    const newCardDefaultProps: Omit<Card, "title" | "content"> = {
      order: cards.length + 1,
      id: String(cards.length + 1),
      memorized: false,
      createdAt: Date.now() - 1000 * 60 * 60 * 2,
      memorizedAt: null,
    };

    const newCard: Card = {
      ...newCardDefaultProps,
      ...card,
    };

    setCards([...cards, newCard]);
  };

  const memorizeCard = (id: CardId) => {
    setCards(
      cards.map((card) =>
        card.id === id
          ? { ...card, memorized: true, memorizedAt: Date.now() }
          : card
      )
    );
  };
  const forgetCard = (id: CardId) => {
    setCards(
      cards.map((card) =>
        card.id === id ? { ...card, memorized: false, memorizedAt: null } : card
      )
    );
  };

  const moveCardToBottom = (id: CardId) => {
    const cardIdxToMove = cards.findIndex((c) => c.id === id);
    const card = cards[cardIdxToMove];

    const nextCards = [...cards];
    nextCards.splice(cardIdxToMove, 1);
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
    setCards([...initialCards]);
  };

  return {
    cards,
    setCards,
    memorizeCard,
    forgetCard,
    moveCardToBottom,
    createCard,
    editCard,
    deleteCard,
    resetCards,
  };
};
