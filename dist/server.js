"use strict";
// import dotenv from "dotenv";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
process.on("uncaughtException", (error) => {
    console.log("Uncaught exception", error);
});
require("dotenv/config");
const app_1 = __importDefault(require("./app"));
const db_config_1 = require("./config/db.config");
const env_config_1 = __importDefault(require("./config/env.config"));
const nodemailer_config_1 = require("./config/nodemailer.config");
const mongoose_1 = __importDefault(require("mongoose"));
// import { sendEmail } from "./utils/emailService.utils";
const PORT = env_config_1.default.PORT;
const DB_URI = env_config_1.default.DB_URI;
//* connect database
(0, db_config_1.connectDatabase)(DB_URI);
//* listen
const server = app_1.default.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);
    // console.log(DB_URI)
    (0, nodemailer_config_1.verifyMailServerConnection)();
    // sendEmail();
});
process.on("unhandledRejection", error => {
    console.log("unhandledRejection", error);
    process.exit(1);
});
process.on("SIGNT", () => {
    console.log("SIGNT");
    server.close(async (error) => {
        console.log(error);
        await mongoose_1.default.disconnect();
        process.exit(0);
    });
});
