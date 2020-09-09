const { Deposit } = require("../../models");

module.exports = {
    getDeposit: async (req, res) => {
        try {
            if (req.token.isAdmin) {
                const result = await Deposit.find({
                    status: { $ne: "PENDING" },
                });

                res.send({ message: "Get All datas users", data: result });
            } else {
                res.status(403).send({ message: "You are not allowed" });
            }
        } catch (error) {
            console.log(error);
        }
    },

    getDepositName: async (req, res) => {
        const { search } = req.params;

        try {
            const result = await Deposit.find({
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

    getDepositId: async (req, res) => {
        const { id } = req.params;

        try {
            const result = await Deposit.findById(id);

            if (result) {
                res.send({ result: result });
            } else {
                res.send(`${search} Not Found`);
            }
        } catch (error) {
            res.send(error);
        }
    },

    createDeposit: async (req, res) => {
        const { email, password } = req.body;
        const hashed = await hash(password);

        try {
            const checkEmail = await Deposit.findOne({
                email,
            }).exec();
            if (checkEmail) {
                res.status(400).send({
                    message: `Email ${email} has been registered`,
                });
            } else {
                const result = await Deposit.create({
                    ...req.body,
                    password: hashed,
                });

                res.send({ message: "Registration Completed", data: result });
            }
        } catch (error) {
            console.log(error);
        }
    },

    updateDeposit: async (req, res) => {
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

            const results = await Deposit.findByIdAndUpdate(id, {
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

    deleteDeposit: async (req, res) => {
        const { id } = req.params;

        try {
            if (req.token.isAdmin) {
                const results = await Deposit.deleteOne({
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

    approval: async (req, res) => {
        try {
            if (req.token.isAdmin) {
                const result = await Deposit.find({ status: "PENDING" });

                res.send({ message: "Get All datas users", data: result });
            } else {
                res.status(403).send({ message: "You are not allowed" });
            }
        } catch (error) {
            console.log(error);
        }
    },
};
