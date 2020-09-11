const {
    PORT,
    MONGODB_URI,
    JWT_SECRET,
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USERNAME,
    SMTP_PASSWORD,
    EMAIL_SENDER,
    EMAIL_SENDER_NAME,
    WEBSITE_URL,
    MAILGUN_USER,
    MAILGUN_PASS,
} = require("./environment");
const db = require("./database");

module.exports = {
    db,
    PORT,
    MONGODB_URI,
    JWT_SECRET,
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USERNAME,
    SMTP_PASSWORD,
    EMAIL_SENDER,
    EMAIL_SENDER_NAME,
    WEBSITE_URL,
    MAILGUN_USER,
    MAILGUN_PASS,
};
