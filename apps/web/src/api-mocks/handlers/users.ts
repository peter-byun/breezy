import { envVars } from "@/env-var/envVars";
import { http, HttpResponse } from "msw";
import { delayBasedOnEnvironment } from "../helpers/delayBasedOnEnvironment";
import jwt from "jsonwebtoken";

const activeTokens = new Set<string>();

const API_URL = envVars.NEXT_PUBLIC_BREEZY_API_URL;
const JWT_SECRET = "mock-secret";

const mockUser = {
  id: "user-123",
  name: "Jamie",
  email: "jamie@example.com",
};

export const userHandlers = [
  http.post(`${API_URL}/user/login`, async () => {
    await delayBasedOnEnvironment();

    const token = jwt.sign(
      {
        sub: mockUser.id,
        name: mockUser.name,
        email: mockUser.email,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    activeTokens.add(token);

    return HttpResponse.json({
      succeeded: true,
      accessToken: token,
    });
  }),
  http.post(`${API_URL}/user/logout`, async ({ request }) => {
    await delayBasedOnEnvironment();

    const authHeader = request.headers.get("Authorization");
    const token = authHeader?.split("Bearer ")[1];

    if (token && activeTokens.has(token)) {
      activeTokens.delete(token);
    }

    return HttpResponse.json({
      succeeded: true,
    });
  }),
  http.get(`${API_URL}/user/me`, async ({ request }) => {
    await delayBasedOnEnvironment();

    const authHeader = request.headers.get("Authorization");
    const token = authHeader?.split("Bearer ")[1];

    if (!token || !activeTokens.has(token)) {
      return HttpResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return HttpResponse.json({ user: decoded });
    } catch {
      return HttpResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }
  }),
];
