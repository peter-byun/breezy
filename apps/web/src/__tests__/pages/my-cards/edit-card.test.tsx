import { test, expect } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import MyCardsPage from "../../../app/my-cards/page";
import { TestPageLoader } from "../../setup/components/TestPageLoader";

test("edit a card", async () => {
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
    throw Error("Can't find a card to edit");
  }

  await within(firstCard).getByTestId("edit-card-button").click();

  const dialog = await waitFor(() => {
    return screen.getByRole("dialog", { name: /Edit a card/i });
  });
  const titleInput = within(dialog).getByPlaceholderText("Enter the title");
  const contentTextarea = within(dialog).getByPlaceholderText(
    "Enter the content for title"
  );
  const saveButton = within(dialog).getByRole("button", { name: /save/i });

  await user.clear(titleInput);
  await user.type(titleInput, "Test Card");
  await user.type(contentTextarea, "This is the content of the test card.");
  await user.click(saveButton);

  const title = await waitFor(
    () => {
      return screen.findByText("Test Card");
    },
    {
      timeout: 5000,
    }
  );

  expect(title).toBeTruthy();
});
