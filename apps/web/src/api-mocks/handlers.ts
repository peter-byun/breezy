import { envVars } from "@/env-var/envVars";
import { dummyCards } from "@/features/card/api/dummy";
import { Card } from "@/features/card/api/type";
import { http, HttpResponse, PathParams } from "msw";

const API_URL = envVars.NEXT_PUBLIC_BREEZY_API_URL;

export const handlers = [
  http.get(`${API_URL}/cards`, () => {
    return HttpResponse.json(cards);
  }),
  http.post<PathParams, Pick<Card, "title" | "content">>(
    `${API_URL}/card`,
    async ({ request }) => {
      const requestBody = await request.json();

      const newCardDefaultProps: Omit<Card, "title" | "content"> = {
        order: cards.length + 1,
        id: String(cards.length + 1),
        memorized: false,
        createdAt: Date.now() - 1000 * 60 * 60 * 2,
        memorizedAt: null,
      };
      const newCard: Card = {
        ...newCardDefaultProps,
        ...requestBody,
      };

      cards = [...cards, newCard];

      return HttpResponse.json({
        succeeded: true,
      });
    }
  ),
  http.patch<PathParams, Pick<Card, "title" | "content">>(
    `${API_URL}/card/:cardId`,
    async ({ params, request }) => {
      const cardId = params.cardId;
      const requestBody = await request.json();

      cards = cards.map((card) =>
        card.id === cardId
          ? { ...card, title: requestBody.title, content: requestBody.content }
          : card
      );

      return HttpResponse.json({
        succeeded: true,
      });
    }
  ),
  http.patch<PathParams<"cardId">, Pick<Card, "memorized">>(
    `${API_URL}/card/:cardId/memorized`,
    async ({ params, request }) => {
      const cardId = params.cardId;

      const body = await request.json();
      cards = cards.map((card) =>
        card.id === cardId
          ? {
              ...card,
              memorized: body.memorized,
              memorizedAt: body.memorized ? Date.now() : null,
            }
          : card
      );

      return HttpResponse.json({
        succeeded: true,
      });
    }
  ),
  http.patch<
    PathParams<"cardId">,
    {
      toIdx: number;
    }
  >(`${API_URL}/card/:cardId/reorder`, async ({ params, request }) => {
    const cardId = params.cardId;
    const requestBody = await request.json();

    const from = cards.findIndex((card) => card.id === cardId);
    if (from === -1) {
      return new HttpResponse(null, {
        status: 400,
        statusText: "Card not found",
      });
    }

    const fromCopy = { ...cards[from] };
    const to = requestBody.toIdx;

    cards.splice(from, 1);
    cards.splice(to, 0, fromCopy);

    return HttpResponse.json({
      succeeded: true,
    });
  }),
  http.delete<PathParams<"cardId">>(
    `${API_URL}/card/:cardId`,
    async ({ params }) => {
      const cardIdxToForget = cards.findIndex(
        (card) => card.id === String(params.cardId)
      );

      const nextCards = [...cards];
      nextCards.splice(cardIdxToForget, 1);

      cards = nextCards;

      return HttpResponse.json({
        succeeded: true,
      });
    }
  ),
];

let cards = dummyCards.sort((a, b) => a.order - b.order);
