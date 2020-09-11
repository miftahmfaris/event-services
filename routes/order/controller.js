const { Order } = require("../../models");
const crypto = require("crypto-browserify");

module.exports = {
    getOrder: async (req, res) => {
        try {
            const result = await Order.find()
                .populate("memberID", "_id fullname email balance")
                .populate("eventID")
                .sort({ createdAt: "desc" });

            res.send({ message: "Get All datas users", data: result });
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

            res.send({ message: "Order Completed", data: result });
        } catch (error) {
            console.log(error);
        }
    },

    updateOrder: async (req, res) => {
        const { id } = req.params;
        try {
            const ticketNumber = crypto.randomBytes(4).toString("hex");

            if (req.token.isAdmin) {
                const results = await Order.findByIdAndUpdate(id, {
                    $set: {
                        ...req.body,
                        updatedBy: req.token.email,
                        ticketNumber: ticketNumber.toUpperCase(),
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

    getOrderByMemberId: async (req, res) => {
        try {
            const { id } = req.params;

            const result = await Order.find({ memberID: id })
                .sort({ createdAt: "desc" })
                .populate("memberID", "fullname balance isAdmin email")
                .populate("eventID")
                .sort({ createdAt: "desc" });

            res.send({ message: "Get All datas users", data: result });
        } catch (error) {
            console.log(error);
        }
    },

    sortOrder: async (req, res) => {
        const { by, sorting } = req.query;

        try {
            const result = await Order.find()
                .populate("eventID")
                .populate("memberID", "fullname email _id balance")
                .sort({ [by]: sorting });

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
