import z from "zod";



export const wishlistUserSchema=z.object({
    body:z.object({
        product:z
        .string()
        .min(1, "product is required"),
    })
})