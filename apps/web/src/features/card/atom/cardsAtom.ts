import { atom } from "jotai";
import { dummyCards } from "../api/dummy";

type CardAtom = {
  id: string;
  title: string;
  content: string;
  order: number;
  memorized: boolean;
  /**
   * In MS
   */
  createdAt: number;
  /**
   * In MS
   */
  memorizedAt: number;
};

export const initialCards = dummyCards.sort((a, b) => a.order - b.order);

export const cardsAtom = atom<CardAtom[]>(initialCards);
