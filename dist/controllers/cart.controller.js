"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCart = exports.removeCart = exports.updateCart = exports.getCart = exports.create = void 0;
const catchAsync_utils_1 = require("../utils/catchAsync.utils");
const cart_model_1 = require("../models/cart.model");
const appError_utils_1 = __importDefault(require("../utils/appError.utils"));
const product_model_1 = __importDefault(require("../models/product.model"));
const sendResponse_utlis_1 = require("../utils/sendResponse.utlis");
exports.create = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const user_id = req.user._id;
    const { product_id, quantity } = req.body;
    //* Check if product exists
    const product = await product_model_1.default.findById(product_id);
    if (!product) {
        throw new appError_utils_1.default("Product not found", 404);
    }
    //* Find user's cart
    let cart = await cart_model_1.Cart.findOne({ user_id });
    //* If cart doesn't exist, create it
    if (!cart) {
        cart = new cart_model_1.Cart({
            user_id,
            items: [
                {
                    product_id,
                    quantity,
                },
            ],
        });
        await cart.save();
        (0, sendResponse_utlis_1.sendResponse)(res, {
            message: "Cart created successfully",
            statusCode: 201,
            data: cart,
        });
    }
    //* Check if product already exists in cart
    const item = cart.items.find((item) => item.product_id.toString() === product_id);
    if (item) {
        item.quantity += quantity;
    }
    else {
        cart.items.push({
            product_id,
            quantity,
        });
    }
    await cart.save();
    (0, sendResponse_utlis_1.sendResponse)(res, {
        message: "Cart updated successfully",
        statusCode: 200,
        data: cart,
    });
});
//get
exports.getCart = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const user_id = req.user._id;
    const cart = await cart_model_1.Cart.findOne({ user_id }).populate("items.product_id");
    if (!cart)
        throw new appError_utils_1.default("no items in cart", 404);
    (0, sendResponse_utlis_1.sendResponse)(res, {
        message: "Cart fetched successfully",
        statusCode: 201,
        data: cart,
    });
});
//update
exports.updateCart = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const user_id = req.user._id;
    const { product_id, quantity } = req.body;
    const cart = await cart_model_1.Cart.findOne({ user_id });
    if (!cart) {
        throw new appError_utils_1.default("no card exists", 404);
    }
    const item = cart.items.find((item) => item.product_id.toString() === product_id);
    if (!item) {
        throw new appError_utils_1.default("No product found in cart", 404);
    }
    item.quantity = quantity;
    await cart.save();
    (0, sendResponse_utlis_1.sendResponse)(res, {
        message: "Cart updated successfully",
        statusCode: 200,
        data: cart,
    });
});
//delete cart
exports.removeCart = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const user_id = req.user._id;
    const { product_id } = req.body;
    const cart = await cart_model_1.Cart.findOne({ user_id });
    if (!cart) {
        throw new appError_utils_1.default("No cart exists", 404);
    }
    cart.items = cart.items.filter((item) => item.product_id.toString() !== product_id);
    await cart.save();
    (0, sendResponse_utlis_1.sendResponse)(res, {
        message: "Cart removed successfully",
        statusCode: 200,
        data: cart,
    });
});
//clear cart
exports.clearCart = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const user_id = req.user._id;
    const cart = await cart_model_1.Cart.findOne({ user_id });
    if (!cart) {
        throw new appError_utils_1.default("No cart exists", 404);
    }
    cart.items = [];
    await cart.save();
    (0, sendResponse_utlis_1.sendResponse)(res, {
        message: "Cart removed successfully",
        statusCode: 200,
        data: cart,
    });
});
