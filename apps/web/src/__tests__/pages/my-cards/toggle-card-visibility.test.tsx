import { test, expect } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import MyCardsPage from "../../../app/my-cards/page";
import { TestPageLoader } from "../../setup/components/TestPageLoader";

test("toggle visibility of a card", async () => {
  const user = userEvent.setup();

  render(
    <TestPageLoader>
      <MyCardsPage />
    </TestPageLoader>
  );

  const cards = await waitFor(() => {
    return screen.getAllByTestId("card-static");
  });
  const firstCard = cards[0];
  if (!firstCard) {
    throw Error("Can't find a card to toggle");
  }

  const cardVisibilitySwitch = await within(firstCard).getByTestId(
    "card-visibility-switch"
  );

  const originalCardVisibility = cardVisibilitySwitch.dataset.state;
  await user.click(cardVisibilitySwitch);
  const updatedCardVisibility = cardVisibilitySwitch.dataset.state;

  waitFor(
    () => {
      expect(originalCardVisibility).not.toEqual(updatedCardVisibility);
    },
    {
      timeout: 5000,
    }
  );
});
