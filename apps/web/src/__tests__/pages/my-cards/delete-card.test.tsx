import { expect, test } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";

import MyCardsPage from "../../../app/my-cards/page";
import { TestPageLoader } from "../../setup/components/TestPageLoader";

test("delete a card", async () => {
  render(
    <TestPageLoader>
      <MyCardsPage />
    </TestPageLoader>
  );

  const cards = await waitFor(() => {
    return screen.getAllByTestId("card-static");
  });
  const cardsCount = cards.length;
  const firstCard = cards[0];
  if (!firstCard) {
    throw Error("Can't find a card to delete");
  }

  await within(firstCard).getByTestId("delete-card-button").click();

  const lessCards = await screen.getAllByTestId("card-static");

  waitFor(
    () => {
      expect(lessCards.length < cardsCount).toBe(true);
    },
    {
      timeout: 5000,
    }
  );
});
