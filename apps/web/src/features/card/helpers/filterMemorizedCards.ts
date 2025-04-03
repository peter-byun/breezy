import { Card } from "../api/type";

export const filterMemorizedCards = (cards: Card[]) =>
  cards.filter((card) => !card.memorized);
