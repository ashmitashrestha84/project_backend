"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.getById = exports.getAll = exports.create = void 0;
const brand_model_1 = __importDefault(require("../models/brand.model"));
const appError_utils_1 = __importDefault(require("../utils/appError.utils"));
const catchAsync_utils_1 = require("../utils/catchAsync.utils");
const cloudinary_utlis_1 = require("../utils/cloudinary.utlis");
const sendResponse_utlis_1 = require("../utils/sendResponse.utlis");
const pagination_utlis_1 = require("../utils/pagination.utlis");
const uploadFolder = "/brands";
// createBrand()
exports.create = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const file = req.file;
    const { name, description } = req.body;
    const existingBrand = await brand_model_1.default.findOne({ name });
    if (existingBrand) {
        throw new appError_utils_1.default("Brand already exists", 409);
    }
    const brand = new brand_model_1.default({ name, description });
    if (file) {
        const { path, public_id } = await (0, cloudinary_utlis_1.upload)(file, uploadFolder);
        brand.logo = {
            path,
            public_id,
        };
    }
    //!save user
    await brand.save();
    //* success response
    (0, sendResponse_utlis_1.sendResponse)(res, {
        message: "Brand registered",
        statusCode: 201,
        data: brand,
    });
});
//* getall
exports.getAll = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { query, order = "DESC", sortBy = "createdAt", page = 1, limit = 10 } = req.query;
    const currentPage = Number(page);
    const perPage = Number(limit);
    const skip = (currentPage - 1) * perPage;
    const filter = {};
    if (query) {
        filter.$or = [
            {
                name: {
                    $regex: query,
                    $options: "i",
                }
            },
            {
                description: {
                    $regex: query,
                    $options: "i",
                }
            }
        ];
    }
    // filter.name = {
    //   $regex: query,
    //   $options: "i",
    // };
    const brand = await brand_model_1.default.find(filter)
        .limit(perPage)
        .skip(skip)
        .sort({
        [sortBy]: order === "DESC" ? -1 : 1
    });
    const totalCount = await brand_model_1.default.countDocuments(filter);
    (0, sendResponse_utlis_1.sendResponse)(res, {
        message: "Brands fetched successfully",
        statusCode: 200,
        data: { brand, pagination: (0, pagination_utlis_1.getPagination)(totalCount, perPage, currentPage) },
    });
});
// Get Brand By ID
exports.getById = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { id } = req.params;
    const brand = await brand_model_1.default.findOne({ _id: id });
    if (!brand)
        throw new appError_utils_1.default("Brand not found", 404);
    (0, sendResponse_utlis_1.sendResponse)(res, {
        message: "brand fetched",
        statusCode: 201,
        data: brand,
    });
});
// Update Brand
exports.update = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const file = req.file;
    const { id } = req.params;
    const { name, description } = req.body;
    const brand = await brand_model_1.default.findOne({ _id: id });
    if (!brand)
        throw new appError_utils_1.default("Brand doesnot exist", 404);
    if (name)
        brand.name = name;
    if (description)
        brand.description = description;
    if (file) {
        await (0, cloudinary_utlis_1.deleteFile)(brand.logo.public_id);
        const { path, public_id } = await (0, cloudinary_utlis_1.upload)(file, uploadFolder);
        brand.logo = {
            path,
            public_id,
        };
    }
    await brand.save();
    (0, sendResponse_utlis_1.sendResponse)(res, {
        message: "Category updated",
        statusCode: 201,
        data: brand,
    });
});
// Delete Brand
exports.remove = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { id } = req.params;
    const brand = await brand_model_1.default.findOneAndDelete({ _id: id });
    if (!brand)
        throw new appError_utils_1.default("Brand not found", 404);
    if (brand.logo.public_id) {
        await (0, cloudinary_utlis_1.deleteFile)(brand.logo.public_id);
    }
    (0, sendResponse_utlis_1.sendResponse)(res, {
        message: "Brand deleted successfully",
        statusCode: 201,
        data: null,
    });
});
