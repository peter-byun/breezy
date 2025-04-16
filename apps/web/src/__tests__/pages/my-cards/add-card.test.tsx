import { test, expect } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import MyCardsPage from "../../../app/my-cards/page";
import { TestPageLoader } from "../../setup/components/TestPageLoader";

test("add a card", async () => {
  const user = userEvent.setup();

  render(
    <TestPageLoader>
      <MyCardsPage />
    </TestPageLoader>
  );

  await user.click(screen.getByTestId("add-card-button"));

  const dialog = screen.getByRole("dialog", { name: /add a card/i });
  const titleInput = within(dialog).getByPlaceholderText("Enter the title");
  const contentTextarea = within(dialog).getByPlaceholderText(
    "Enter the content for title"
  );
  const saveButton = within(dialog).getByRole("button", { name: /save/i });

  await user.type(titleInput, "Test Card");
  await user.type(contentTextarea, "This is the content of the test card.");
  await user.click(saveButton);

  const title = await waitFor(() => {
    return screen.getByText("Test Card");
  });

  expect(title).toBeTruthy();
});
