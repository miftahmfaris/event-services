const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USERNAME,
    SMTP_PASSWORD,
    GMAIL_ACCOUNT,
    GMAIL_PASSWORD,
} = require("../config");
const nodemailer = require("nodemailer");

// const transport = nodemailer.createTransport({
//     host: SMTP_HOST,
//     port: SMTP_PORT,
//     // secure: true,
//     auth: {
//         user: SMTP_USERNAME,
//         pass: SMTP_PASSWORD,
//     },
// });

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: GMAIL_ACCOUNT,
        pass: GMAIL_PASSWORD, // naturally, replace both with your real credentials or an application-specific password
    },
});

module.exports = {
    textEmail: () => async (mailOptions) => {
        try {
            const result = await transporter.sendMail(mailOptions);
            return result;
        } catch (error) {
            throw error;
        }
    },
};
