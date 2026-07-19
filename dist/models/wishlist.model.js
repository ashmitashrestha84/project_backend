"use strict";
//product:  ,user:
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wishlist = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const wishlistSchema = new mongoose_1.default.Schema({
    products: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "product",
            required: true,
        },
    ],
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: [true, "user is required"],
        ref: "user",
    }
});
exports.Wishlist = mongoose_1.default.model("wishlist", wishlistSchema);
