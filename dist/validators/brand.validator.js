"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBrandSchema = exports.brandIdSchema = exports.getBrandsSchema = exports.updateBrandSchema = exports.createBrandSchema = void 0;
const zod_1 = require("zod");
exports.createBrandSchema = zod_1.z.object({
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
exports.updateBrandSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().min(1, "Brand ID is required"),
    }),
    body: zod_1.z.object({
        name: zod_1.z
            .string()
            .min(3, "Brand name must be at least 3 characters")
            .max(50, "Brand name must not exceed 50 characters")
            .optional(),
        description: zod_1.z
            .string()
            .min(10, "Description must be at least 10 characters")
            .max(500, "Description must not exceed 500 characters")
            .optional(),
    }),
});
exports.getBrandsSchema = zod_1.z.object({
    query: zod_1.z.object({
        query: zod_1.z.string().optional(),
        page: zod_1.z.coerce
            .number()
            .int()
            .min(1)
            .optional(),
        limit: zod_1.z.coerce
            .number()
            .int()
            .min(1)
            .optional(),
        sortBy: zod_1.z.string().optional(),
        order: zod_1.z
            .enum(["ASC", "DESC"])
            .optional(),
    }),
});
exports.brandIdSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().min(1, "Brand ID is required"),
    }),
});
exports.deleteBrandSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().min(1, "Brand ID is required"),
    }),
});
