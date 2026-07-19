"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategorySchema = exports.categoryIdSchema = exports.getCategoriesSchema = exports.updateCategorySchema = exports.createCategorySchema = void 0;
const zod_1 = require("zod");
exports.createCategorySchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string("Name must be string")
            .trim()
            .min(3, "Name must be at least 3 characters long")
            .max(50, "Name cannot exceed 50 characters"),
        description: zod_1.z
            .string("Description must be string")
            .trim()
            .min(10, "Description must be at least 10 characters long")
            .max(500, "Description cannot exceed 500 characters"),
    }),
});
exports.updateCategorySchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().min(1, "Category ID is required"),
    }),
    body: zod_1.z.object({
        name: zod_1.z
            .string()
            .min(2, "Category name must be at least 2 characters")
            .max(100, "Category name must not exceed 100 characters")
            .optional(),
        description: zod_1.z
            .string()
            .min(5, "Description must be at least 5 characters")
            .max(500, "Description must not exceed 500 characters")
            .optional(),
    }),
});
exports.getCategoriesSchema = zod_1.z.object({
    query: zod_1.z.object({
        query: zod_1.z.string().optional(),
    }),
});
exports.categoryIdSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().min(1, "Category ID is required"),
    }),
});
exports.deleteCategorySchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().min(1, "Category ID is required"),
    }),
});
