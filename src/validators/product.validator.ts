    import { z } from "zod";

    //* Create Product
    export const createProductSchema = z.object({
    body: z.object({
        name: z
        .string()
        .min(3, "Name must be at least 3 characters long")
        .max(50, "Name must not exceed 50 characters"),

        price: z.coerce
        .number()
        .min(0, "Price must be greater than or equal to 0"),

        description: z
        .string()
        .min(10, "Description must be at least 10 characters long")
        .max(100, "Description must not exceed 100 characters"),

        brand: z
        .string()
        .min(1, "Brand is required"),

        category: z
        .string()
        .min(1, "Category is required"),

        new_arrival: z.coerce.boolean().optional(),

        is_featured: z.coerce.boolean().optional(),
    }),
    });

    //* Update Product
    export const updateProductSchema = z.object({
    body: z.object({
        name: z
        .string()
        .min(3, "Name must be at least 3 characters long")
        .max(50, "Name must not exceed 50 characters")
        .optional(),

        price: z.coerce
        .number()
        .min(0, "Price must be greater than or equal to 0")
        .optional(),

        description: z
        .string()
        .min(10, "Description must be at least 10 characters long")
        .max(100, "Description must not exceed 100 characters")
        .optional(),

        brand: z.string().min(1).optional(),

        category: z.string().min(1).optional(),

        new_arrival: z.coerce.boolean().optional(),

        is_featured: z.coerce.boolean().optional(),

        deleted_images: z.array(z.string()).optional(),
    }),

    params: z.object({
        id: z.string().min(1, "Product ID is required"),
    }),
    });

    export const getProductsSchema = z.object({
    query: z.object({
        query: z.string().optional(),
        category: z.string().optional(),
        brand: z.string().optional(),
        minPrice: z.coerce.number().optional(),
        maxPrice: z.coerce.number().optional(),
    }),
    });

    export const productIdSchema = z.object({
    params: z.object({
        id: z.string().min(1, "Product ID is required"),
    }),
    });

    export const productCategorySchema = z.object({
    params: z.object({
        id: z.string().min(1, "Category ID is required"),
    }),
    });

    export const productBrandSchema = z.object({
    params: z.object({
        id: z.string().min(1, "Brand ID is required"),
    }),
    });