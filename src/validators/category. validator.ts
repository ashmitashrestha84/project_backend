import { z } from "zod";

export const createCategorySchema = z.object({
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

export const updateCategorySchema = z.object({
  params: z.object({
    id: z.string().min(1, "Category ID is required"),
  }),

  body: z.object({
    name: z
      .string()
      .min(2, "Category name must be at least 2 characters")
      .max(100, "Category name must not exceed 100 characters")
      .optional(),

    description: z
      .string()
      .min(5, "Description must be at least 5 characters")
      .max(500, "Description must not exceed 500 characters")
      .optional(),
  }),
});

export const getCategoriesSchema = z.object({
  query: z.object({
    query: z.string().optional(),
  }),
});

export const categoryIdSchema = z.object({
  params: z.object({
    id: z.string().min(1, "Category ID is required"),
  }),
});

export const deleteCategorySchema = z.object({
  params: z.object({
    id: z.string().min(1, "Category ID is required"),
  }),
});