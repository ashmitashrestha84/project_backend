// import dotenv from "dotenv";

process.on("uncaughtException",(error)=>{
    console.log("Uncaught exception",error);
});

import "dotenv/config"

import app from "./app";
import { connectDatabase } from "./config/db.config";
import ENV_CONFIG from "./config/env.config";
import { verifyMailServerConnection } from "./config/nodemailer.config";
import mongoose from "mongoose";
// import { sendEmail } from "./utils/emailService.utils";

const PORT = ENV_CONFIG.PORT;
const DB_URI=ENV_CONFIG.DB_URI;

//* connect database
connectDatabase(DB_URI);


//* listen
const server=app.listen(PORT,()=>{
    console.log(`server is running at http://localhost:${PORT}`);
    // console.log(DB_URI)
    verifyMailServerConnection();
    // sendEmail();
});

process.on("unhandledRejection",error=>{
    console.log("unhandledRejection",error);
    process.exit(1);
});

process.on("SIGNT",()=>{
    console.log("SIGNT");
    server.close(async(error)=>{
        console.log(error);
        await mongoose.disconnect();
        process.exit(0);
    });
});