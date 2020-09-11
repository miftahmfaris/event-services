const { Order } = require("../../models");

module.exports = {
    getOrder: async (req, res) => {
        try {
            if (req.token.isAdmin) {
                const result = await Order.find({
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

    getOrderName: async (req, res) => {
        const { search } = req.params;

        try {
            const result = await Order.find({
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

    getOrderId: async (req, res) => {
        const { id } = req.params;

        try {
            const result = await Order.findById(id);

            if (result) {
                res.send({ result: result });
            } else {
                res.send(`${search} Not Found`);
            }
        } catch (error) {
            res.send(error);
        }
    },

    createOrder: async (req, res) => {
        try {
            const result = await Order.create({
                ...req.body,
            });

            res.send({ message: "Registration Completed", data: result });
        } catch (error) {
            console.log(error);
        }
    },

    updateOrder: async (req, res) => {
        const { id } = req.params;
        try {
            const { status } = req.body;

            if (req.token.isAdmin) {
                if (status === "PENDING") {
                    req.body.approvedBy = req.token.email;
                }

                const results = await Order.findByIdAndUpdate(id, {
                    $set: {
                        ...req.body,
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
            res.send(error);
        }
    },

    deleteOrder: async (req, res) => {
        const { id } = req.params;

        try {
            if (req.token.isAdmin) {
                const results = await Order.deleteOne({
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
                const result = await Order.find({ status: "PENDING" });

                res.send({ message: "Get All datas users", data: result });
            } else {
                res.status(403).send({ message: "You are not allowed" });
            }
        } catch (error) {
            console.log(error);
        }
    },

    sortOrder: async (req, res) => {
        const { by, sort } = req.query;

        try {
            const result = await Order.find().sort({ [by]: sort });
            if (result) {
                res.send({ data: result });
            } else {
                res.send(`${search} Not Found`);
            }
        } catch (error) {
            console.log(error);
        }
    },

    searchOrder: async (req, res) => {
        const { q } = req.query;

        try {
            const result = await Order.find({
                $or: [{ name: { $regex: q, $options: "i" } }],
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
};
