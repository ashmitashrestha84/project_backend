"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const enumtypes_1 = require("../types/enumtypes");
const image_model_1 = __importDefault(require("./image.model"));
//* user schema
const userSchema = new mongoose_1.default.Schema({
    full_name: {
        type: String,
        required: [true, "full_name is required"],
        minLength: [3, "name must be atleast 3 character long"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: [true, "user already exist with provided email"],
        trim: true,
    },
    password: {
        type: String,
        select: false,
        required: [true, "password is required"],
    },
    role: {
        type: String,
        enum: Object.values(enumtypes_1.Role),
        default: enumtypes_1.Role.USER,
    },
    profile_image: {
        type: image_model_1.default,
        default: null,
    },
    phone: {
        type: String,
        required: false,
        maxLength: [10, "phone number at most be 10 digits long"],
    },
}, { timestamps: true });
const User = mongoose_1.default.model("user", userSchema);
exports.default = User;
