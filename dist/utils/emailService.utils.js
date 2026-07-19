"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const env_config_1 = __importDefault(require("../config/env.config"));
const nodemailer_config_1 = __importDefault(require("../config/nodemailer.config"));
const sendEmail = async ({ to, html, subject, cc, bcc, attachments }) => {
    // const option={to,html,subject,cc,bcc,attachments}
    try {
        const MailOptions = {
            to: to,
            from: env_config_1.default.SMTP_MAIL_FROM,
            subject: subject,
            html: html,
        };
        if (cc) {
            MailOptions["cc"] = cc;
        }
        if (bcc) {
            MailOptions["bcc"] = bcc;
        }
        if (attachments) {
            MailOptions["attachments"] = attachments;
        }
        await nodemailer_config_1.default.sendMail(MailOptions);
        console.log("mail sent");
    }
    catch (error) {
        console.log(error);
    }
};
exports.sendEmail = sendEmail;
