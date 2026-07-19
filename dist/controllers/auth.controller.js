"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeProfileImage = exports.login = exports.register = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt_utlis_1 = require("../utils/bcrypt.utlis");
const appError_utils_1 = __importDefault(require("../utils/appError.utils"));
const catchAsync_utils_1 = require("../utils/catchAsync.utils");
const cloudinary_utlis_1 = require("../utils/cloudinary.utlis");
const jwt_utils_1 = require("../utils/jwt.utils");
const env_config_1 = __importDefault(require("../config/env.config"));
const sendResponse_utlis_1 = require("../utils/sendResponse.utlis");
const emailService_utils_1 = require("../utils/emailService.utils");
const emailTemplate_utils_1 = require("../utils/emailTemplate.utils");
const uploadFolder = "/profile_images";
//*  register
//create
exports.register = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { full_name, email, password, phone } = req.body;
    const file = req.file;
    console.log(file);
    // if (!full_name) {
    // //   const error: any = new Error("fullname is required");
    // //   error.StatusCode = 404;
    // //   error.Status = "fail";
    // //   throw error;
    // throw new appError('full_name is required',400); 
    // }
    // if (!email) throw new appError('email is required',400);
    // if (!password) {
    // throw new appError('password is required',400);
    // }
    const user = new user_model_1.default({ email, password, full_name, phone }); //create user
    //* hash password
    const hashPass = await (0, bcrypt_utlis_1.hashPassword)(password);
    user.password = hashPass;
    //* handle profile image
    if (file) {
        //* upload to clodinary
        const { path, public_id } = await (0, cloudinary_utlis_1.upload)(file, uploadFolder);
        user.profile_image = {
            path,
            public_id,
        };
    }
    //!save user
    await user.save();
    //email template
    //* send account created email
    (0, emailService_utils_1.sendEmail)({
        to: user.email,
        subject: "Account Created",
        html: (0, emailTemplate_utils_1.accountCreatedHtml)({
            full_name: user.full_name,
            email: user.email,
            createdAt: user.createdAt,
        })
    });
    //* converting mongoose doc to js object
    const { password: user_pass, ...rest } = user.toObject();
    //* success response
    (0, sendResponse_utlis_1.sendResponse)(res, {
        message: "Account created",
        statusCode: 201,
        data: rest,
    });
});
//* login
exports.login = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    // email , password
    const { email, password } = req.body;
    // if (!email) {
    //   throw new appError("email is required", 400);
    // }
    // if (!password) {
    //   throw new appError("password is required", 400);
    // }
    //* find user by email
    const user = await user_model_1.default.findOne({ email: email }).select("+password");
    if (!user) {
        throw new appError_utils_1.default("credentials does not matched", 400);
    }
    //* compare password
    const isPassMatched = await (0, bcrypt_utlis_1.comparePassword)(password, user.password);
    if (!isPassMatched) {
        throw new appError_utils_1.default("credentials does not matched", 400);
    }
    (0, emailService_utils_1.sendEmail)({
        to: user.email,
        subject: "Account Created",
        html: (0, emailTemplate_utils_1.newLoginDetectedHtml)({
            full_name: user.full_name,
            email: user.email,
            loginTime: new Date(Date.now()),
            device: req.headers["user-agent"],
        })
    });
    //* jwt token
    const payload = {
        _id: user._id,
        email: user.email,
        role: user.role,
    };
    const access_token = (0, jwt_utils_1.generateJwtToken)(payload);
    res.cookie('access_token', access_token, {
        httpOnly: env_config_1.default.NODE_ENV === "development" ? false : true, //production->true  development->false
        secure: env_config_1.default.NODE_ENV === "development" ? false : true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: env_config_1.default.NODE_ENV === "development" ? "lax" : "none", //production->none    
    });
    const { password: p, ...rest } = user.toObject();
    //* success response
    (0, sendResponse_utlis_1.sendResponse)(res, {
        statusCode: 200,
        message: "Login User",
        data: {
            user: rest,
            access_token,
        },
    });
    // res.status(201).json({
    //   message:"login success",
    //   status:"success",
    //   success:true,
    //   data:{
    //     user,
    //     access_token,
    //   }
    // })
});
//* logout
//* get profile
//* change profile image
exports.changeProfileImage = (0, catchAsync_utils_1.catchAsync)(async (req, res, next) => {
    const { _id } = req.user;
    const file = req.file;
    if (!file) {
        throw new appError_utils_1.default("profile_image is required", 400);
    }
    const user = await user_model_1.default.findOne({ _id: _id });
    if (!user) {
        throw new appError_utils_1.default("Profile not found", 400);
    }
    //!delete old Image
    if (user.profile_image && user.profile_image.public_id) {
        await (0, cloudinary_utlis_1.deleteFile)(user.profile_image.public_id);
    }
    const { path, public_id } = await (0, cloudinary_utlis_1.upload)(file, uploadFolder);
    user.profile_image = {
        path,
        public_id,
    };
    //* send success response
    (0, sendResponse_utlis_1.sendResponse)(res, {
        message: "Profile Image updated",
        statusCode: 200,
        data: user,
    });
});
//* change password
//* forgot password
//* change mail
