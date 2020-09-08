const { User } = require("../../models");
const { hash, compare } = require("../../helpers");
const { createToken } = require("../../helpers");

const fs = require("fs");

module.exports = {
    getUser: async (req, res) => {
        try {
            if (req.token.isAdmin) {
                const result = await User.find({ status: { $ne: "PENDING" } });

                res.send({ message: "Get All datas users", data: result });
            } else {
                res.status(403).send({ message: "You are not allowed" });
            }
        } catch (error) {
            console.log(error);
        }
    },

    getUserName: async (req, res) => {
        const { search } = req.params;

        try {
            const result = await User.find({
                $or: [
                    { fullname: { $regex: search, $options: "i" } },
                    { address: { $regex: search, $options: "i" } },
                ],
            });
            if (result) {
                res.send({ result: result });
            } else {
                res.send(`${search} Not Found`);
            }
        } catch (error) {
            res.send(error);
        }
    },

    getUserId: async (req, res) => {
        const { id } = req.params;

        try {
            const result = await User.findById(id);

            if (result) {
                res.send({ result: result });
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
            const checkEmail = await User.findOne({
                email,
            }).exec();
            if (checkEmail) {
                res.status(400).send({
                    message: `Email ${email} has been registered`,
                });
            } else {
                const result = await User.create({
                    ...req.body,
                    password: hashed,
                });

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

            if (status === "PENDING") {
                req.body.approvedBy = req.token.email;
            }

            const results = await User.findByIdAndUpdate(id, {
                $set: {
                    ...req.body,
                },
            });

            res.send({
                message: `Update data succcess`,
                data: results,
            });
        } catch (error) {
            res.send(error);
        }
    },

    deleteUser: async (req, res) => {
        const { id } = req.params;

        try {
            if (req.token.isAdmin) {
                const results = await User.deleteOne({
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

            const registeredUser = await User.findOne({
                $or: [{ email }],
            });

            if (registeredUser !== null) {
                const compared = await compare(
                    password,
                    registeredUser.password
                );
                if (compared === true) {
                    const token = await createToken({
                        id: registeredUser._id,
                        fullname: registeredUser.fullname,
                        email: registeredUser.email,
                        status: registeredUser.status,
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
            } else {
                res.status(403).send({
                    message: "Your Email is not registered",
                });
            }
        } catch (error) {
            console.log(error);
        }
    },

    logout: (req, res) => {
        req.logout();
        res.redirect("/users/login");
    },

    approval: async (req, res) => {
        try {
            if (req.token.isAdmin) {
                const result = await User.find({ status: "PENDING" });

                res.send({ message: "Get All datas users", data: result });
            } else {
                res.status(403).send({ message: "You are not allowed" });
            }
        } catch (error) {
            console.log(error);
        }
    },
};
