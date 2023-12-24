import { z } from "zod";

export const CreateCard = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title is required",
    })
    .min(3, {
      message: "Title is too short. Minimum 3 characters.",
    })
    .max(30, {
      message: "Title is too long. Maximum 30 characters.",
    }),
  listId: z.string(),
  boardId: z.string(),
  id: z.string().optional()
});
