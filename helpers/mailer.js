const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USERNAME,
    SMTP_PASSWORD,
    MAILGUN_USER,
    MAILGUN_PASS,
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
    host: "smtp.mailgun.org",
    port: 587,
    // secure: true,
    auth: {
        user: MAILGUN_USER,
        pass: MAILGUN_PASS,
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
