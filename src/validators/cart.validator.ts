

import {z} from "zod";

export const cartUserSchema=z.object({
    body:z.object({
        product_id:z
        .string("product must be string")
        .min(1,"product must be at least 1 character long"),
        quantity:z
        .number("quantity must be string")
        .min(1,"quantity must be at least 1 character long"),
    })

})