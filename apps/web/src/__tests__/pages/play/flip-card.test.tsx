import { expect, test } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import PlayPage from "../../../app/play/page";
import { TestPageLoader } from "../../setup/components/TestPageLoader";
import { hideOnboarding } from "../../setup/hooks/hideOnboarding";
import { isNil } from "es-toolkit";
import { waitForLoading } from "@/__tests__/setup/helpers/waitForLoading";

test("Renders the play page", async () => {
  const user = userEvent.setup();

  render(
    <TestPageLoader>
      <PlayPage />
    </TestPageLoader>
  );

  await waitForLoading();

  hideOnboarding();

  const cards = await screen.queryAllByTestId("flip-card");
  const card = cards.pop();

  if (isNil(card)) {
    throw Error("Could not find a flip card");
  }

  await user.click(card);

  expect(within(card).findByTestId("flip-card-back")).toBeTruthy();
});
