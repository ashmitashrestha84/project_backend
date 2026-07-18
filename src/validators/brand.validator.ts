import { z } from "zod";

export const createBrandSchema = z.object({
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

export const updateBrandSchema = z.object({
  params: z.object({
    id: z.string().min(1, "Brand ID is required"),
  }),

  body: z.object({
    name: z
      .string()
      .min(3, "Brand name must be at least 3 characters")
      .max(50, "Brand name must not exceed 50 characters")
      .optional(),

    description: z
      .string()
      .min(10, "Description must be at least 10 characters")
      .max(500, "Description must not exceed 500 characters")
      .optional(),
  }),
});

export const getBrandsSchema = z.object({
  query: z.object({
    query: z.string().optional(),

    page: z.coerce
      .number()
      .int()
      .min(1)
      .optional(),

    limit: z.coerce
      .number()
      .int()
      .min(1)
      .optional(),

    sortBy: z.string().optional(),

    order: z
      .enum(["ASC", "DESC"])
      .optional(),
  }),
});


export const brandIdSchema = z.object({
  params: z.object({
    id: z.string().min(1, "Brand ID is required"),
  }),
});

export const deleteBrandSchema = z.object({
  params: z.object({
    id: z.string().min(1, "Brand ID is required"),
  }),
});