"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getbyId = exports.getAllAdmins = exports.getAll = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const appError_utils_1 = __importDefault(require("../utils/appError.utils"));
const catchAsync_utils_1 = require("../utils/catchAsync.utils");
const enumtypes_1 = require("../types/enumtypes");
//!get all Users
exports.getAll = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const users = await user_model_1.default.find({ role: enumtypes_1.Role.USER });
    res.status(201).json({
        message: "User fetched",
        status: "Success",
        success: true,
        data: users,
    });
});
//!get all admins
exports.getAllAdmins = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    // const admins=await User.find({role:"ADMIN"})
    const admins = await user_model_1.default.find({
        role: {
            $in: [enumtypes_1.Role.ADMIN, enumtypes_1.Role.SUPER_ADMIN]
        }
    });
    res.status(201).json({
        message: "User fetched",
        status: "Success",
        success: true,
        data: admins,
    });
});
//!getbyID
exports.getbyId = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { id } = req.params;
    const users = await user_model_1.default.findOne({ _id: id });
    if (!users) {
        throw new appError_utils_1.default("user not found", 404);
    }
    res.status(200).json({
        message: `user:${id} fetched`,
        success: true,
        status: "success",
        data: users,
    });
});
