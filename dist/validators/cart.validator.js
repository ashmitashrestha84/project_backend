"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeCartSchema = exports.UpdateCartSchema = exports.CreateCartSchema = void 0;
const zod_1 = require("zod");
exports.CreateCartSchema = zod_1.z.object({
    body: zod_1.z.object({
        product_id: zod_1.z
            .string()
            .min(1, "product must be at least 1 character long"),
        quantity: zod_1.z.
            coerce.number("quantity must be string")
            .min(1, "quantity must be at least 1 character long"),
    })
});
exports.UpdateCartSchema = zod_1.z.object({
    body: zod_1.z.object({
        product_id: zod_1.z
            .string()
            .min(1, "product must be at least 1 character long"),
        quantity: zod_1.z.
            coerce.number("quantity must be string")
            .min(1, "quantity must be at least 1 character long"),
    })
});
exports.removeCartSchema = zod_1.z.object({
    body: zod_1.z.object({
        product_id: zod_1.z
            .string()
            .min(1, "Product ID is required"),
    }),
});
