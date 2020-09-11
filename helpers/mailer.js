const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USERNAME,
    SMTP_PASSWORD,
    GMAIL_ACCOUNT,
    GMAIL_PASSWORD,
    MAILGUN_API,
    MAILGUN_DOMAIN,
} = require("../config");

const nodemailer = require("nodemailer");
const mg = require("nodemailer-mailgun-transport");

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
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: GMAIL_ACCOUNT,
        pass: GMAIL_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false,
    },
});

console.log(GMAIL_ACCOUNT);
console.log(GMAIL_PASSWORD);

const auth = {
    auth: {
        api_key: MAILGUN_API,
        domain: MAILGUN_DOMAIN,
    },
};

const nodemailerMailgun = nodemailer.createTransport(mg(auth));

module.exports = {
    textEmail: () => async (mailOptions) => {
        try {
            const result = await transporter.sendMail(mailOptions);
            return result;
        } catch (error) {
            throw error;
        }
    },
    mailGun: () => async (mailOptions) => {
        try {
            const result = await nodemailerMailgun.sendMail(mailOptions);

            return result;
        } catch (error) {
            console.log(error);
        }
    },
};
