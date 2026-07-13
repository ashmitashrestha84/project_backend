import { MailOptions } from "nodemailer/lib/json-transport";
import ENV_CONFIG from "../config/env.config";
import transporter from "../config/nodemailer.config";


interface IMailOption{
    to:string | string[];
    html:string;
    subject:string;
    cc?:string | string[];
    bcc?: string|string[];
    attachments?: any[];
}



export const sendEmail=async({to,html,subject,cc,bcc,attachments}:IMailOption)=>{   //option is object
    
    // const option={to,html,subject,cc,bcc,attachments}
    
    try{
        const MailOptions:MailOptions={    
            to:to,
            from:ENV_CONFIG.SMTP_MAIL_FROM,
            subject:subject,
            html:html,

        };
        if(cc){
            MailOptions["cc"]=cc;
        }
        if(bcc){
            MailOptions["bcc"]=bcc;
        }
        if(attachments){
            MailOptions["attachments"]=attachments;
        }

        await transporter.sendMail(MailOptions);
        console.log("mail sent");
    }catch(error){
        console.log(error);
    }
}