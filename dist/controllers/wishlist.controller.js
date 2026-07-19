"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeWishlist = exports.clearWishlist = exports.getWishlist = exports.addToWishlist = void 0;
const catchAsync_utils_1 = require("../utils/catchAsync.utils");
const wishlist_model_1 = require("../models/wishlist.model");
const appError_utils_1 = __importDefault(require("../utils/appError.utils"));
const sendResponse_utlis_1 = require("../utils/sendResponse.utlis");
const product_model_1 = __importDefault(require("../models/product.model"));
exports.addToWishlist = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const user = req.user._id;
    const { product } = req.body;
    // Check if product exists
    const existingProduct = await product_model_1.default.findOne({ _id: product });
    if (!existingProduct) {
        throw new appError_utils_1.default("Product not found", 404);
    }
    // Find user's wishlist
    let wishlist = await wishlist_model_1.Wishlist.findOne({ user });
    // Create wishlist if it doesn't exist
    if (!wishlist) {
        wishlist = new wishlist_model_1.Wishlist({
            user,
            products: [product],
        });
        await wishlist.save();
        return (0, sendResponse_utlis_1.sendResponse)(res, {
            statusCode: 201,
            message: "Wishlist created successfully",
            data: wishlist,
        });
    }
    // Check if product already exists
    const exists = wishlist.products.find((id) => id.toString() === product);
    if (exists) {
        throw new appError_utils_1.default("Product already exists in wishlist", 400);
    }
    // Add product
    wishlist.products.push(product);
    await wishlist.save();
    (0, sendResponse_utlis_1.sendResponse)(res, {
        statusCode: 200,
        message: "Product added to wishlist successfully",
        data: wishlist,
    });
});
//get
exports.getWishlist = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const user = req.user._id;
    if (!user)
        throw new appError_utils_1.default("No user found", 404);
    const wishlist = await wishlist_model_1.Wishlist.findOne({ user }).populate({
        path: "products",
        populate: [
            {
                path: "brand",
            },
            {
                path: "category",
            },
        ],
    });
    if (!wishlist)
        throw new appError_utils_1.default("Wishlist not found", 404);
    (0, sendResponse_utlis_1.sendResponse)(res, {
        message: "Wishlist fetched successfully",
        statusCode: 200,
        data: wishlist,
    });
});
exports.clearWishlist = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const user = req.user._id;
    const { product } = req.body;
    const wishlist = await wishlist_model_1.Wishlist.findOne({ user });
    if (!wishlist)
        throw new appError_utils_1.default("No wishlist exists", 404);
    const exists = wishlist.products.find((id) => id.toString() === product);
    if (!exists)
        throw new appError_utils_1.default("Product not found in wishlist", 404);
    wishlist.products = wishlist.products.filter((id) => id.toString() !== product);
    await wishlist.save();
    (0, sendResponse_utlis_1.sendResponse)(res, {
        message: "Product removed from wishlist successfully",
        statusCode: 200,
        data: wishlist,
    });
});
//delete
exports.removeWishlist = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const user = req.user._id;
    const wishlist = await wishlist_model_1.Wishlist.findOne({ user });
    if (!wishlist)
        throw new appError_utils_1.default("no wishlist exists", 404);
    wishlist.products = [];
    await wishlist.save();
    (0, sendResponse_utlis_1.sendResponse)(res, {
        message: "product is removed from wishlist",
        statusCode: 201,
        data: wishlist.products,
    });
});
