import { screen, waitForElementToBeRemoved } from "@testing-library/react";

export const waitForLoading = () => {
  return waitForElementToBeRemoved(() => screen.getByTestId("page-loader"));
};
