import { envVars } from "@/env-var/envVars";
import { http, HttpResponse } from "msw";
import { delayBasedOnEnvironment } from "../helpers/delayBasedOnEnvironment";
import { SignJWT, jwtVerify } from "jose";
import { isNil, isNotNil } from "es-toolkit";
import { USER_CONSTANTS } from "@/features-shared/user/constants";

const activeTokens = new Set<string>();

const API_URL = envVars.NEXT_PUBLIC_BREEZY_API_URL;
const JWT_SECRET = "mock-secret";
const JWT_SECRET_KEY = new TextEncoder().encode(JWT_SECRET);

const mockUser = {
  id: "user-123",
  name: "Madison",
  email: "madison@example.com",
};

async function createToken(payload: Record<string, unknown>) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(JWT_SECRET_KEY);
}

async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET_KEY);
    return payload;
  } catch {
    return null;
  }
}

export const userHandlers = [
  http.post(`${API_URL}/user/login`, async () => {
    await delayBasedOnEnvironment();

    const token = await createToken({
      sub: mockUser.id,
      name: mockUser.name,
      email: mockUser.email,
    });

    activeTokens.add(token);

    return HttpResponse.json(
      {
        succeeded: true,
      },
      {
        headers: {
          "Set-Cookie": `${USER_CONSTANTS.userAccessToken}=${token}`,
        },
      }
    );
  }),

  http.post(`${API_URL}/user/logout`, async ({ request }) => {
    await delayBasedOnEnvironment();

    const authHeader = request.headers.get("Authorization");
    const token = authHeader?.split("Bearer ")[1];

    if (isNotNil(token) && token.length > 0 && activeTokens.has(token)) {
      activeTokens.delete(token);
    }

    return HttpResponse.json(
      {
        succeeded: true,
      },
      {
        headers: {
          "Set-Cookie": `${USER_CONSTANTS.userAccessToken}=`,
        },
      }
    );
  }),

  http.get(`${API_URL}/user/me`, async ({ request }) => {
    await delayBasedOnEnvironment();

    const authHeader = request.headers.get("Authorization");
    const token = authHeader?.split("Bearer ")[1];

    if (isNil(token) || !activeTokens.has(token)) {
      return HttpResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifyToken(token);
    if (isNil(payload)) {
      return HttpResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    return HttpResponse.json({ user: payload });
  }),
];
