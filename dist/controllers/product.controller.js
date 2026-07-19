"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFeatured = exports.getNewArrivals = exports.getByBrand = exports.getByCategory = exports.remove = exports.update = exports.create = exports.getById = exports.getAll = void 0;
const sendResponse_utlis_1 = require("../utils/sendResponse.utlis");
const catchAsync_utils_1 = require("../utils/catchAsync.utils");
const product_model_1 = __importDefault(require("../models/product.model"));
const appError_utils_1 = __importDefault(require("../utils/appError.utils"));
const cloudinary_utlis_1 = require("../utils/cloudinary.utlis");
const uploadFolder = "/products";
//* getall
exports.getAll = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { query, category, brand, minPrice, maxPrice } = req.query;
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
    //* category
    if (category) {
        filter.category = category;
    }
    if (brand) {
        filter.brand = brand;
    }
    //* price range
    if (minPrice || maxPrice) {
        const low = Number(minPrice);
        const high = Number(maxPrice);
        console.log(low, high);
        if (low) {
            filter.price = {
                $gte: low,
            };
        }
        if (high) {
            filter.price = {
                $lte: high,
            };
        }
        if (low && high) {
            filter.price = {
                $lte: high,
                $gte: low,
            };
        }
    }
    console.log(maxPrice);
    const product = await product_model_1.default.find(filter)
        .populate("brand")
        .populate("category");
    //* send success response
    (0, sendResponse_utlis_1.sendResponse)(res, {
        message: "Product fetched",
        statusCode: 200,
        data: product,
    });
});
//*get by id
exports.getById = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { id } = req.params;
    const product = await product_model_1.default.findOne({ _id: id });
    if (!product)
        throw new appError_utils_1.default("No product exits", 404);
    (0, sendResponse_utlis_1.sendResponse)(res, {
        message: "Product fetched",
        statusCode: 200,
        data: product,
    });
});
//* create
exports.create = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { product_image, images } = req.files;
    const { name, price, description, category, brand, new_arrival, is_featured } = req.body;
    if (!product_image || !product_image[0]) {
        throw new appError_utils_1.default("product image is required", 400);
    }
    const product = new product_model_1.default({
        name,
        description,
        price,
        brand,
        category,
        new_arrival,
        is_featured,
    });
    const { path, public_id } = await (0, cloudinary_utlis_1.upload)(product_image[0], uploadFolder);
    product.product_image = {
        path,
        public_id,
    };
    //Promise.all(arr_promise)   // all promise must be fulfilled
    //Promise.all(arr_promise)    //all promise must be settled may or maynot be fulfilled
    //Promise.race(arr_promise)   //gives result of first fulfilled promise
    //Promise.any(arr_promise)
    if (images && images.length > 0) {
        const promises = images.map(file => (0, cloudinary_utlis_1.upload)(file, uploadFolder));
        const files = await Promise.allSettled(promises);
        const fullFilled = files
            .filter(promise => promise.status === 'fulfilled')
            .map((img) => img.value);
        product.set('images', fullFilled);
    }
    await product.save();
    //* Populate references
    await product.populate("brand");
    await product.populate("category");
    (0, sendResponse_utlis_1.sendResponse)(res, {
        message: "Product created",
        statusCode: 200,
        data: product
    });
});
exports.update = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { product_image, images } = req.files;
    const { id } = req.params;
    const { name, price, description, category, brand, is_featured, new_arrival, deleted_images } = req.body;
    const product = await product_model_1.default.findOne({ _id: id });
    if (!product)
        throw new appError_utils_1.default("Product is required", 404);
    if (name)
        product.name = name;
    if (description)
        product.description = description;
    if (category)
        product.category = category;
    if (brand)
        product.brand = brand;
    if (price)
        product.price = price;
    if (new_arrival)
        product.new_arrival = new_arrival;
    if (is_featured)
        product.is_featured = is_featured;
    if (product_image && product_image[0]) {
        (0, cloudinary_utlis_1.deleteFile)(product.product_image.public_id);
        const { path, public_id } = await (0, cloudinary_utlis_1.upload)(product_image[0], uploadFolder);
        product.product_image = {
            path,
            public_id,
        };
    }
    //* if deleted images
    if (deleted_images &&
        Array.isArray(deleted_images) &&
        deleted_images.length > 0) { //* delete from cloudinary
        Promise.allSettled(deleted_images.map((public_id) => (0, cloudinary_utlis_1.deleteFile)(public_id)));
        //* remaining images
        product.images = product.images.filter((img) => !deleted_images.includes(img.public_id.toString()));
    }
    //* if new images
    if (images && images.length > 0) {
        // [{status:'',value:{path,public_id}}]
        const files = await Promise.allSettled(images.map((file) => (0, cloudinary_utlis_1.upload)(file, uploadFolder)));
        const newImages = files
            .filter((file) => file.status === "fulfilled")
            .map((file) => file.value);
        product.set("images", [...product.images, ...newImages]);
    }
    //* save product
    await product.save();
    //* send successful response
    (0, sendResponse_utlis_1.sendResponse)(res, {
        message: `product:${id} updated`,
        data: product,
        statusCode: 200,
    });
});
//* Delete
exports.remove = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { id } = req.params;
    const product = await product_model_1.default.findOneAndDelete({ _id: id });
    if (!product)
        throw new appError_utils_1.default("Product not found", 404);
    //* delete cover image
    (0, cloudinary_utlis_1.deleteFile)(product.product_image.public_id);
    //* delete images
    if (product.images && product.images.length > 0) {
        Promise.allSettled(product.images.map((img) => (0, cloudinary_utlis_1.deleteFile)(img.public_id)));
    }
    //* delete product
    await product.save();
    (0, sendResponse_utlis_1.sendResponse)(res, {
        message: "Product deleted successfully",
        statusCode: 200,
        data: product,
    });
});
//* get by category
exports.getByCategory = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { id } = req.params;
    const category = await product_model_1.default.find({ category: id }).populate("category");
    if (category.length === 0) {
        throw new appError_utils_1.default("Category ID not found", 404);
    }
    (0, sendResponse_utlis_1.sendResponse)(res, {
        statusCode: 200,
        message: "Product fetched successfully",
        data: category,
    });
});
//* get by brand
exports.getByBrand = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { id } = req.params;
    const brand = await product_model_1.default.find({ brand: id }).populate("brand");
    if (brand.length === 0) {
        throw new appError_utils_1.default("Brand ID not found", 404);
    }
    (0, sendResponse_utlis_1.sendResponse)(res, {
        statusCode: 200,
        message: "Product fetched successfully",
        data: brand,
    });
});
//* get new_arrival
exports.getNewArrivals = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const products = await product_model_1.default.find()
        .sort({ createdAt: -1 }) // newest first
        .populate("brand")
        .populate("category");
    if (products.length === 0) {
        throw new appError_utils_1.default("No products found", 404);
    }
    (0, sendResponse_utlis_1.sendResponse)(res, {
        statusCode: 200,
        message: "New arrivals fetched successfully",
        data: products,
    });
});
//* get featured
exports.getFeatured = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const products = await product_model_1.default.find({
        is_featured: true,
    })
        .populate("brand")
        .populate("category");
    if (products.length === 0) {
        throw new appError_utils_1.default("No featured products found", 404);
    }
    (0, sendResponse_utlis_1.sendResponse)(res, {
        statusCode: 200,
        message: "Featured products fetched successfully",
        data: products,
    });
});
