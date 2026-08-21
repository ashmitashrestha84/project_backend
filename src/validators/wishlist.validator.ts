import z from "zod";

export const createWishlistSchema = z.object({
  body: z.object({
    product_id: z.string().min(1, "Product ID is required"),
  }),
});

export const removeWishlistSchema = z.object({
  params: z.object({
    id: z.string().min(1, "Product ID is required"),
  }),
});
