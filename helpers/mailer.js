const {
    SENDGRID_API_USER,
    SENDGRID_API_PASSWORD,
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USERNAME,
    SMTP_PASSWORD,
} = require("../config");
const nodemailer = require("nodemailer");
var sgTransport = require("nodemailer-sendgrid-transport");

const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    // secure: true,
    auth: {
        user: SMTP_USERNAME,
        pass: SMTP_PASSWORD,
    },
});

// const transport = nodemailer.createTransport(
//     sgTransport({
//         auth: {
//             api_user: SENDGRID_API_USER, // SG username
//             api_key: SENDGRID_API_PASSWORD // SG password
//         }
//     })
// );

module.exports = {
    textEmail: () => async (mailOptions) => {
        try {
            const result = await transport.sendMail(mailOptions);
            return result;
        } catch (error) {
            throw error;
        }
    },
};
