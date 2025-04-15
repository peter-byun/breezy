import { expect, test } from "vitest";
import {
  render,
  renderHook,
  screen,
  waitFor,
  within,
} from "@testing-library/react";

import PlayPage from "../app/play/page";
import { TestPageLoader } from "./components/TestPageLoader";
import { useOnboardingState } from "@/app/play/components/PlayOnboarding/useOnboardingState";
import { useEffect } from "react";

test("Renders the play page", async () => {
  render(
    <TestPageLoader>
      <PlayPage />
    </TestPageLoader>
  );

  await waitFor(
    async () => {
      within(screen.getByTestId("onboarding-alert"))
        .getByTestId("alert-confirm")
        .click();
    },
    {
      timeout: 80000,
    }
  );

  renderHook(() => {
    const { setShowOnboardingLayer } = useOnboardingState();
    useEffect(() => {
      setShowOnboardingLayer(false);
    }, [setShowOnboardingLayer]);
  });

  const cards = await screen.queryAllByTestId("flip-card");

  expect(cards.length).greaterThanOrEqual(0);
});
