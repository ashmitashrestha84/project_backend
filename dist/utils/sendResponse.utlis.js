"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = (res, resData) => {
    const { data, message, statusCode } = resData;
    return res.status(statusCode).json({
        message,
        data,
        success: String(statusCode).startsWith("2"), //returns boolen
        status: String(statusCode).startsWith('2')
            ? "success"
            : String(statusCode).startsWith("4")
                ? "fail"
                : "error",
    });
};
exports.sendResponse = sendResponse;
