"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// @types_packageName -> npm i -D  @types_packageName
//* creating app instances
const app = (0, express_1.default)();
//! using middlewares
//! using routes
//* health routes
app.get("/", (req, res, next) => {
    res.status(400).json({
        message: "Server is up & running",
        success: true,
        status: "message",
        data: null,
    });
});
//! path not found
app.use((req, res, next) => {
    const message = `Cannot ${req.method} on ${req.path}`;
    res.status(404).json({
        message,
        success: false,
        status: 'fail',
        data: null,
    });
});
exports.default = app;
