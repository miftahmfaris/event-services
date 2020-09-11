const { Member } = require("../../models");
const { hash, compare, mailer } = require("../../helpers");
const { createToken } = require("../../helpers");
const {
    EMAIL_SENDER,
    EMAIL_SENDER_NAME,
    WEBSITE_URL,
} = require("../../config");

module.exports = {
    getUser: async (req, res) => {
        try {
            if (req.token.isAdmin) {
                const result = await Member.find();

                res.send({ message: "Get All datas users", data: result });
            } else {
                res.status(403).send({ message: "You are not allowed" });
            }
        } catch (error) {
            console.log(error);
        }
    },

    getUserId: async (req, res) => {
        const { id } = req.params;

        try {
            const result = await Member.findById(id).select(
                "fullname isAdmin avatar email balance"
            );

            if (result) {
                res.send({ message: "Get Data by id", data: result });
            } else {
                res.send(`${search} Not Found`);
            }
        } catch (error) {
            res.send(error);
        }
    },

    createUser: async (req, res) => {
        const { email, password } = req.body;
        const hashed = await hash(password);

        try {
            const checkEmail = await Member.findOne({
                email,
            }).exec();
            if (checkEmail) {
                res.status(400).send({
                    message: `Email ${email} has been registered`,
                });
            } else {
                const result = await Member.create({
                    ...req.body,
                    password: hashed,
                    createdBy: req.body.email,
                });

                let mailOptions = {
                    from: {
                        name: EMAIL_SENDER_NAME,
                        address: EMAIL_SENDER,
                    },
                    to: {
                        name: result.fullname,
                        address: result.email,
                    },
                    subject: "Register Complete",
                    html: `<p>Your registration is complete, click this link for activation your account <a href="${WEBSITE_URL}/activation/${result._id}" target="_blank">link</p>`,
                };

                await mailer.textEmail()(mailOptions);

                res.send({ message: "Registration Completed", data: result });
            }
        } catch (error) {
            console.log(error);
        }
    },

    updateUser: async (req, res) => {
        const { id } = req.params;
        try {
            const { password, status } = req.body;

            if (password) {
                const hashed = await hash(password);

                req.body.password = hashed;
            }

            if (status !== "PENDING") {
                req.body.approvedBy = req.token.email;
            }

            const results = await Member.findByIdAndUpdate(id, {
                $set: {
                    ...req.body,
                    updatedBy: req.token.email,
                },
            });

            res.send({
                message: `Update data succcess`,
                data: results,
            });
        } catch (error) {
            console.log(error);
        }
    },

    deleteUser: async (req, res) => {
        const { id } = req.params;

        try {
            if (req.token.isAdmin) {
                const results = await Member.deleteOne({
                    _id: id,
                });
                res.send({
                    message: `Delete data succcess`,
                    results: results,
                });
            } else {
                res.status(403).send({ message: "You are not allowed" });
            }
        } catch (error) {
            res.send(error);
        }
    },

    login: async (req, res) => {
        try {
            const { password, email } = req.body;

            const registeredUser = await Member.findOne({
                $or: [{ email }],
            });

            if (registeredUser !== null) {
                const compared = await compare(
                    password,
                    registeredUser.password
                );
                if (registeredUser.status === "ACTIVE") {
                    if (compared === true) {
                        const token = await createToken({
                            id: registeredUser._id,
                            fullname: registeredUser.fullname,
                            email: registeredUser.email,
                            status: registeredUser.status,
                            isAdmin: registeredUser.isAdmin,
                        });

                        res.send({
                            message: "Login Successfully",
                            result: token,
                        });
                    } else {
                        res.status(403).send({
                            message: "Your Email or Password is Incorrect",
                        });
                    }
                } else if (registeredUser.status === "PENDING") {
                    res.status(403).send({
                        message: `Your account is ${registeredUser.status} please activation your account`,
                    });
                }
            } else {
                res.status(403).send({
                    message: "Your Email is not registered",
                });
            }
        } catch (error) {
            console.log(error);
        }
    },

    approval: async (req, res) => {
        try {
            if (req.token.isAdmin) {
                const result = await Member.find({ status: "PENDING" });

                res.send({ message: "Get All datas users", data: result });
            } else {
                res.status(403).send({ message: "You are not allowed" });
            }
        } catch (error) {
            console.log(error);
        }
    },

    resetPassword: async (req, res) => {
        const { id } = req.params;
        try {
            const { password } = req.body;

            if (password) {
                const hashed = await hash(password);

                req.body.password = hashed;
            }

            const results = await Member.findByIdAndUpdate(id, {
                $set: {
                    ...req.body,
                },
            });

            res.send({
                message: `Update data succcess`,
                data: results,
            });
        } catch (error) {
            console.log(error);
        }
    },

    sortMember: async (req, res) => {
        const { by, sorting } = req.query;

        try {
            const result = await Member.find().sort({ [by]: sorting });
            if (result) {
                res.send({ data: result });
            } else {
                res.send(`${search} Not Found`);
            }
        } catch (error) {
            console.log(error);
        }
    },

    searchMember: async (req, res) => {
        const { q } = req.query;

        try {
            const result = await Member.find({
                $or: [
                    { fullname: { $regex: q, $options: "i" } },
                    { email: { $regex: q, $options: "i" } },
                ],
            });
            if (result) {
                res.send({ data: result });
            } else {
                res.send(`${search} Not Found`);
            }
        } catch (error) {
            res.send(error);
        }
    },

    activation: async (req, res) => {
        const { id } = req.params;
        try {
            const results = await Member.findByIdAndUpdate(id, {
                $set: {
                    ...req.body,
                },
            });

            res.send({
                message: `Activation succcess`,
                data: results,
            });
        } catch (error) {
            console.log(error);
        }
    },

    forgetPassword: async (req, res) => {
        try {
            const { email } = req.body;

            const results = await Member.findOne({ email });

            let mailOptions = {
                from: {
                    name: EMAIL_SENDER_NAME,
                    address: EMAIL_SENDER,
                },
                to: {
                    name: results.fullname,
                    address: results.email,
                },
                subject: "Forget Password",
                html: `<p>Click this <a href="${WEBSITE_URL}/forget-password/${results._id}" target="_blank">link to reset your password </p>`,
            };

            await mailer.textEmail()(mailOptions);

            res.send({
                message: `Forget Password succcess`,
            });
        } catch (error) {
            console.log(error);
        }
    },
};
