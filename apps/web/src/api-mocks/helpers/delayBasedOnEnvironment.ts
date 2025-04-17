import { getEnvironment } from "@/env-var/getEnvironment";
import { delay } from "msw";

const shouldDelay = getEnvironment().isDevelopment;
export const delayBasedOnEnvironment = async (timeout?: number) => {
  if (shouldDelay) {
    return delay(timeout);
  }
  return Promise.resolve();
};
