"use strict";
//{ user:user_id, items[{product_id,quantity:number}]}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const cartSchema = new mongoose_1.default.Schema({
    user_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: [true, "user is required"],
        ref: 'user',
    },
    items: [
        {
            product_id: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "product",
                required: [true, "Product is required"],
            },
            quantity: {
                type: Number,
                required: [true, "Quantity is required"],
                default: 1,
            },
        },
    ],
});
exports.Cart = mongoose_1.default.model("cart", cartSchema);
