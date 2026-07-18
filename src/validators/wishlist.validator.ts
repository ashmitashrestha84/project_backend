import z from "zod";



export const createWishlistSchema=z.object({
    body:z.object({
        product:z
        .string()
        .min(1, "product is required"),
    })
})

export const removeWishlistSchema = z.object({
  body: z.object({
    product: z
      .string()
      .min(1, "Product ID is required"),
  }),
});