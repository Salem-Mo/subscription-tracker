import nodemailer from "nodemailer";
import { SMTP_HOST ,SMTP_PORT,SMTP_USER,SMTP_PASS } from "../config/env.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: SMTP_HOST || "smtp.gmail.com",
  port: SMTP_PORT || 587,
  secure: false,
  auth: {
    user: SMTP_USER, 
    pass: SMTP_PASS, 
  },
});

export default transporter;
