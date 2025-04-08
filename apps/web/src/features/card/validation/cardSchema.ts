import { z } from "zod";

export const cardSchema = z.object({
  title: z.string().min(1, "Please enter title").max(50, "Title is too long"),
  content: z
    .string()
    .min(1, "Please enter content")
    .max(500, "Content is too long"),
});
