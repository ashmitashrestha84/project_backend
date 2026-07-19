"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.getById = exports.getAll = void 0;
const category_model_1 = __importDefault(require("../models/category.model"));
const catchAsync_utils_1 = require("../utils/catchAsync.utils");
const appError_utils_1 = __importDefault(require("../utils/appError.utils"));
const cloudinary_utlis_1 = require("../utils/cloudinary.utlis");
const sendResponse_utlis_1 = require("../utils/sendResponse.utlis");
const appError_utils_2 = __importDefault(require("../utils/appError.utils"));
const uploadFolder = "/categories";
exports.getAll = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { query } = req.query;
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
    const categories = await category_model_1.default.find(filter);
    (0, sendResponse_utlis_1.sendResponse)(res, {
        message: "category fetched successfully",
        statusCode: 201,
        data: categories,
    });
});
exports.getById = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { id } = req.params;
    const category = await category_model_1.default.findById(id);
    if (!category) {
        throw new appError_utils_1.default("category not found", 404);
    }
    (0, sendResponse_utlis_1.sendResponse)(res, {
        message: `category by id ${id} is fetched`,
        statusCode: 201,
        data: category,
    });
});
exports.create = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const file = req.file;
    const { name, description } = req.body;
    const existingCategory = await category_model_1.default.findOne({ name });
    if (existingCategory) {
        throw new appError_utils_1.default("name already exists", 404);
    }
    const category = new category_model_1.default({ name, description });
    if (file) {
        const { path, public_id } = await (0, cloudinary_utlis_1.upload)(file, uploadFolder);
        category.logo = {
            path,
            public_id,
        };
    }
    await category.save();
    (0, sendResponse_utlis_1.sendResponse)(res, {
        message: "Category created successfully",
        statusCode: 201,
        data: category,
    });
});
exports.update = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const file = req.file;
    const { id } = req.params;
    const { name, description } = req.body;
    const category = await category_model_1.default.findOne({ _id: id });
    if (!category)
        throw new appError_utils_2.default("Brand doesnot exist", 404);
    if (name)
        category.name = name;
    if (description)
        category.description = description;
    if (file) {
        await (0, cloudinary_utlis_1.deleteFile)(category.logo.public_id);
        const { path, public_id } = await (0, cloudinary_utlis_1.upload)(file, uploadFolder);
        category.logo = {
            path,
            public_id,
        };
    }
    await category.save();
    (0, sendResponse_utlis_1.sendResponse)(res, {
        message: "Category updated",
        statusCode: 201,
        data: category,
    });
});
exports.remove = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { id } = req.params;
    const category = await category_model_1.default.findByIdAndDelete({ _id: id });
    if (!category) {
        throw new appError_utils_1.default("category not found.", 404);
    }
    if (category.logo.public_id) {
        await (0, cloudinary_utlis_1.deleteFile)(category.logo.public_id);
    }
    (0, sendResponse_utlis_1.sendResponse)(res, {
        message: "category deleted successfully.",
        statusCode: 201,
        data: null,
    });
});
