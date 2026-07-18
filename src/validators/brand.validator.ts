import { z } from "zod";

export const brandUserSchema = z.object({
  body: z.object({
    name: z
      .string("Name must be string")
      .trim()
      .min(3, "Name must be at least 3 characters long")
      .max(50, "Name cannot exceed 50 characters"),

    description: z
      .string("Description must be string")
      .trim()
      .min(10, "Description must be at least 10 characters long")
      .max(500, "Description cannot exceed 500 characters"),
  }),
});