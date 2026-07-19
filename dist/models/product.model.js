"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const image_model_1 = __importDefault(require("./image.model"));
const productSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "productName is required"],
        minLength: 3,
        trim: true,
    },
    price: {
        type: Number,
        required: [true, "price is required"],
        min: 0,
    },
    description: {
        type: String,
        required: [true, "description is required"],
        minLength: 5,
        trim: true,
    },
    product_image: {
        type: image_model_1.default,
        required: true,
    },
    category: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: [true, "category is required"],
        ref: 'category',
    },
    brand: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: [true, "brand is requirted"],
        ref: 'brand',
    },
    images: [{
            type: image_model_1.default,
            default: null,
        }],
    new_arrival: {
        type: Boolean,
        default: false,
    },
    is_featured: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
const Product = mongoose_1.default.model("product", productSchema);
exports.default = Product;
