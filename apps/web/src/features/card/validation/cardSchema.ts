import { z } from "zod";

export const cardSchema = z.object({
  title: z.string().min(1).max(50),
  content: z.string().min(1).max(500),
});
