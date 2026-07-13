import ENV_CONFIG from "../config/env.config";
import transporter from "../config/nodemailer.config";




export const sendEmail=async()=>{
    try{
        await transporter.sendMail({
            to:"rubinasubedi18@gmail.com",
            from:ENV_CONFIG.SMTP_MAIL_FROM,
            subject:"Send email testing",
            html:"<h1>Welcome to E-commerce</h1>",
        });
        console.log("mail sent");
    }catch(error){
        console.log(error);
    }
}