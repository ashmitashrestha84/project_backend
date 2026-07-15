import { z } from "zod";

export const productValidateSchema=z.object({
    body:z.object({
        name:z
        .string("name must be string")
        .min(3,"name must be at least 3 character long")
        .max(50,"name must not exceed 50 character"),

        price:z
        .string("price must be string"),

        description:z
        .string("description must be string")
        .min(10,"description must be at least 10 Character long")
        .max(100,"description must not exceed 100 character"),

        brand:z
        .string()
        .min(1, "Brand is required"),

        category:z
        .string()
        .min(1, "Category is required"),

        new_arrival:z
        .coerce.boolean()
        .optional(),

        is_featured:z
        .coerce.boolean()
        .optional(),

    })
})