"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getbyId = exports.getAll = exports.createReview = void 0;
const catchAsync_utils_1 = require("../utils/catchAsync.utils");
const product_model_1 = __importDefault(require("../models/product.model"));
const appError_utils_1 = __importDefault(require("../utils/appError.utils"));
const review_model_1 = __importDefault(require("../models/review.model"));
const sendResponse_utlis_1 = require("../utils/sendResponse.utlis");
exports.createReview = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const user = req.user._id;
    const { product, rating, text } = req.body;
    const existProduct = await product_model_1.default.findOne({ _id: product });
    if (!existProduct)
        throw new appError_utils_1.default("Product doesnot exists", 404);
    const existReview = await review_model_1.default.findOne({ product, user });
    if (existReview)
        throw new appError_utils_1.default("Review already made", 400);
    const review = new review_model_1.default({ user, product, rating, text });
    await review.save();
    res.status(201).json({
        success: true,
        message: "Review created successfully",
        data: review,
    });
});
exports.getAll = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const user = req.user._id;
    const review = await review_model_1.default.findOne({ user }).populate("product");
    if (!review)
        throw new appError_utils_1.default("No review exists", 404);
    (0, sendResponse_utlis_1.sendResponse)(res, {
        message: "Product fetched successfully",
        statusCode: 201,
        data: review,
    });
});
//getbyId
exports.getbyId = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const user = req.user._id;
    const { id } = req.params;
    const review = await review_model_1.default.findOne({ _id: id, user }).populate("product");
    if (!review)
        throw new appError_utils_1.default("No review exists", 404);
    (0, sendResponse_utlis_1.sendResponse)(res, {
        message: "Product fetched successfully",
        statusCode: 201,
        data: review,
    });
});
