"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeWishlistSchema = exports.createWishlistSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.createWishlistSchema = zod_1.default.object({
    body: zod_1.default.object({
        product: zod_1.default
            .string()
            .min(1, "product is required"),
    })
});
exports.removeWishlistSchema = zod_1.default.object({
    body: zod_1.default.object({
        product: zod_1.default
            .string()
            .min(1, "Product ID is required"),
    }),
});
