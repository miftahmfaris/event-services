const { Event } = require("../../models");

module.exports = {
    getEvent: async (req, res) => {
        try {
            if (req.token.isAdmin) {
                const result = await Event.find({
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

    getEventName: async (req, res) => {
        const { search } = req.params;

        try {
            const result = await Event.find({
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

    getEventId: async (req, res) => {
        const { id } = req.params;

        try {
            const result = await Event.findById(id);

            if (result) {
                res.send({ result: result });
            } else {
                res.send(`${search} Not Found`);
            }
        } catch (error) {
            res.send(error);
        }
    },

    createEvent: async (req, res) => {
        const { email, password } = req.body;
        const hashed = await hash(password);

        try {
            const checkEmail = await Event.findOne({
                email,
            }).exec();
            if (checkEmail) {
                res.status(400).send({
                    message: `Email ${email} has been registered`,
                });
            } else {
                const result = await Event.create({
                    ...req.body,
                    password: hashed,
                });

                res.send({ message: "Registration Completed", data: result });
            }
        } catch (error) {
            console.log(error);
        }
    },

    updateEvent: async (req, res) => {
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

            const results = await Event.findByIdAndUpdate(id, {
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

    deleteEvent: async (req, res) => {
        const { id } = req.params;

        try {
            if (req.token.isAdmin) {
                const results = await Event.deleteOne({
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
};
