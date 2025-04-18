import { z } from "zod";

export const getAccessTokenValidator = (token: string | undefined | null) => {
  const tokenErrorMessage = `Invalid Token: ${token}`;

  return z.string({ message: tokenErrorMessage }).min(1, tokenErrorMessage);
};
