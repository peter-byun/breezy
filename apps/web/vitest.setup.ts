import { handlers } from "@/api-mocks/handlers";
import { setupServer } from "msw/node";

import { afterAll, afterEach, beforeAll } from "vitest";

const server = setupServer(...handlers);

beforeAll(() => {
  server.listen({
    onUnhandledRequest: "bypass",
  });
});

afterAll(() => server.close());

afterEach(() => server.resetHandlers());
