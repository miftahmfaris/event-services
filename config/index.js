const {
    PORT,
    MONGODB_URI,
    JWT_SECRET,
    SENDGRID_API_USER,
    SENDGRID_API_PASSWORD,
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USERNAME,
    SMTP_PASSWORD,
    EMAIL_SENDER,
    EMAIL_SENDER_NAME,
    WEBSITE_URL,
} = require("./environment");
const db = require("./database");

module.exports = {
    db,
    PORT,
    MONGODB_URI,
    JWT_SECRET,
    SENDGRID_API_USER,
    SENDGRID_API_PASSWORD,
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USERNAME,
    SMTP_PASSWORD,
    EMAIL_SENDER,
    EMAIL_SENDER_NAME,
    WEBSITE_URL,
};
