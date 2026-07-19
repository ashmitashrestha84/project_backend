"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDatabase = (DB_URI) => {
    console.log(process.env.DB_URI);
    mongoose_1.default.connect(DB_URI)
        .then(() => {
        console.log("Database connected at atlas");
    })
        .catch((error) => {
        console.log("----database connection error-----");
        console.log(error);
    });
};
exports.connectDatabase = connectDatabase;
