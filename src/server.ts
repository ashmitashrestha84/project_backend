// import dotenv from "dotenv";
import "dotenv/config"

import app from "./app";
import { connectDatabase } from "./config/db.config";
import ENV_CONFIG from "./config/env.config";
import { verifyMailServerConnection } from "./config/nodemailer.config";
// import { sendEmail } from "./utils/emailService.utils";

const PORT = ENV_CONFIG.PORT;
const DB_URI=ENV_CONFIG.DB_URI;

//* connect database
connectDatabase(DB_URI);


//* listen
app.listen(PORT,()=>{
    console.log(`server is running at http://localhost:${PORT}`);
    // console.log(DB_URI)
    verifyMailServerConnection();
    // sendEmail();
});