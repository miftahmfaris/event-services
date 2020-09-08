const { Admin, User, House } = require("../../models");
const { hash, compare } = require("../../helpers");
const { createToken } = require("../../helpers");

module.exports = {
    getSummary: async (req, res) => {
        try {
            if (req.token.isAdmin) {
                const sumAdmin = await Admin.countDocuments();
                const userActive = await User.countDocuments({
                    status: "ACTIVE",
                });
                const userPending = await User.countDocuments({
                    status: "PENDING",
                });
                const userReject = await User.countDocuments({
                    status: "REJECTED",
                });
                const sumHouse = await House.countDocuments();

                res.send({
                    message: "Get All datas Summary",
                    data: [
                        {
                            status: "Admin",
                            count: sumAdmin,
                        },
                        {
                            status: "House",
                            count: sumHouse,
                        },
                        {
                            status: "User Pending",
                            count: userPending,
                        },
                        {
                            status: "User Active",
                            count: userActive,
                        },
                        {
                            status: "User Reject",
                            count: userReject,
                        },
                    ],
                });
            } else {
                res.status(403).send({ message: "You are not allowed" });
            }
        } catch (error) {
            console.log(error);
        }
    },

    getAdmin: async (req, res) => {
        try {
            if (req.token.isAdmin) {
                const result = await Admin.find();

                res.send({ message: "Get All datas users", data: result });
            } else {
                res.status(403).send({ message: "You are not allowed" });
            }
        } catch (error) {
            console.log(error);
        }
    },

    getAdminName: async (req, res) => {
        const { username } = req.params;

        try {
            if (req.token.isAdmin) {
                const result = await Admin.find({
                    username: { $regex: username, $options: "i" },
                });

                res.send({ result: result });
            } else {
                res.status(403).send({ message: "You are not allowed" });
            }
        } catch (error) {
            res.send(error);
        }
    },

    getAdminId: async (req, res) => {
        const { id } = req.params;

        try {
            if (req.token.isAdmin) {
                const result = await Admin.findById(id);

                if (result) {
                    res.send({ message: "Get Data By ID", data: result });
                } else {
                    res.status(400).send(`${search} Not Found`);
                }
            } else {
                res.status(403).send({ message: "You are not allowed" });
            }
        } catch (error) {
            res.send(error);
        }
    },

    createAdmin: async (req, res) => {
        const { email, password } = req.body;
        const hashed = await hash(password);

        try {
            if (req.token.isAdmin) {
                const checkEmail = await Admin.findOne({
                    email,
                }).exec();
                if (checkEmail) {
                    res.status(400).send({
                        message: `Email ${email} has been registered`,
                    });
                } else {
                    const result = await Admin.create({
                        ...req.body,
                        createdBy: req.token.email,
                        password: hashed,
                    });

                    res.send({
                        message: "Registration Completed",
                        data: result,
                    });
                }
            } else {
                res.status(403).send({ message: "You are not allowed" });
            }
        } catch (error) {
            console.log(error);
        }
    },

    updateAdmin: async (req, res) => {
        const { id } = req.params;
        try {
            if (req.token.isAdmin) {
                const { password } = req.body;

                if (password !== undefined) {
                    const hashed = await hash(password);

                    req.body.password = hashed;
                }

                const results = await Admin.findByIdAndUpdate(id, {
                    $set: {
                        ...req.body,
                        updatedBy: req.token.email || req.token.username,
                        updateAt: Date.now(),
                    },
                });

                res.send({
                    message: `Update data succcess`,
                    data: results,
                });
            } else {
                res.status(403).send({ message: "You are not allowed" });
            }
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    },

    deleteAdmin: async (req, res) => {
        const { id } = req.params;

        try {
            if (req.token.isAdmin) {
                const results = await Admin.deleteOne({
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
            const { password, email, username } = req.body;

            const registeredUser = await Admin.findOne({
                $or: [{ email }, { username }],
            });

            if (registeredUser !== null) {
                const compared = await compare(
                    password,
                    registeredUser.password
                );
                if (compared === true) {
                    const token = await createToken({
                        isAdmin: true,
                        id: registeredUser._id,
                        fullname: registeredUser.fullname,
                        email: registeredUser.email,
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
        res.redirect("/admin/login");
    },
};
