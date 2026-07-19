"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productBrandSchema = exports.productCategorySchema = exports.productIdSchema = exports.getProductsSchema = exports.updateProductSchema = exports.createProductSchema = void 0;
const zod_1 = require("zod");
//* Create Product
exports.createProductSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string()
            .min(3, "Name must be at least 3 characters long")
            .max(50, "Name must not exceed 50 characters"),
        price: zod_1.z.coerce
            .number()
            .min(0, "Price must be greater than or equal to 0"),
        description: zod_1.z
            .string()
            .min(10, "Description must be at least 10 characters long")
            .max(100, "Description must not exceed 100 characters"),
        brand: zod_1.z
            .string()
            .min(1, "Brand is required"),
        category: zod_1.z
            .string()
            .min(1, "Category is required"),
        new_arrival: zod_1.z.coerce.boolean().optional(),
        is_featured: zod_1.z.coerce.boolean().optional(),
    }),
});
//* Update Product
exports.updateProductSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string()
            .min(3, "Name must be at least 3 characters long")
            .max(50, "Name must not exceed 50 characters")
            .optional(),
        price: zod_1.z.coerce
            .number()
            .min(0, "Price must be greater than or equal to 0")
            .optional(),
        description: zod_1.z
            .string()
            .min(10, "Description must be at least 10 characters long")
            .max(100, "Description must not exceed 100 characters")
            .optional(),
        brand: zod_1.z.string().min(1).optional(),
        category: zod_1.z.string().min(1).optional(),
        new_arrival: zod_1.z.coerce.boolean().optional(),
        is_featured: zod_1.z.coerce.boolean().optional(),
        deleted_images: zod_1.z.array(zod_1.z.string()).optional(),
    }),
    params: zod_1.z.object({
        id: zod_1.z.string().min(1, "Product ID is required"),
    }),
});
exports.getProductsSchema = zod_1.z.object({
    query: zod_1.z.object({
        query: zod_1.z.string().optional(),
        category: zod_1.z.string().optional(),
        brand: zod_1.z.string().optional(),
        minPrice: zod_1.z.coerce.number().optional(),
        maxPrice: zod_1.z.coerce.number().optional(),
    }),
});
exports.productIdSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().min(1, "Product ID is required"),
    }),
});
exports.productCategorySchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().min(1, "Category ID is required"),
    }),
});
exports.productBrandSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().min(1, "Brand ID is required"),
    }),
});
