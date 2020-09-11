require("dotenv").config();

module.exports = {
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    SENDGRID_API_USER: process.env.SENDGRID_API_USER,
    SENDGRID_API_PASSWORD: process.env.SENDGRID_API_PASSWORD,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USERNAME: process.env.SMTP_USERNAME,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
    EMAIL_SENDER: process.env.EMAIL_SENDER,
    EMAIL_SENDER_NAME: process.env.EMAIL_SENDER_NAME,
    WEBSITE_URL: process.env.WEBSITE_URL,
    GMAIL_ACCOUNT: process.env.GMAIL_ACCOUNT,
    GMAIL_PASSWORD: process.env.GMAIL_PASSWORD,
};
