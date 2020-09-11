const { Event } = require("../../models");

module.exports = {
    getEvent: async (req, res) => {
        try {
            const result = await Event.find().sort({ createdAt: "desc" });

            res.send({ message: "Get All datas users", data: result });
        } catch (error) {
            console.log(error);
        }
    },

    getEventId: async (req, res) => {
        const { id } = req.params;

        try {
            const result = await Event.findById(id);

            if (result) {
                res.send({ data: result });
            } else {
                res.send(`${search} Not Found`);
            }
        } catch (error) {
            res.send(error);
        }
    },

    createEvent: async (req, res) => {
        try {
            if (req.token.isAdmin) {
                const result = await Event.create({
                    ...req.body,
                    createdBy: req.token.email,
                });

                res.send({ message: "Add Event Successfully", data: result });
            } else {
                res.status(403).send({ message: "You are not allowed" });
            }
        } catch (error) {
            console.log(error);
        }
    },

    updateEvent: async (req, res) => {
        const { id } = req.params;
        try {
            if (req.token.isAdmin) {
                const results = await Event.findByIdAndUpdate(id, {
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

    sortEvent: async (req, res) => {
        const { by, sorting } = req.query;

        try {
            const result = await Event.find().sort({ [by]: sorting });
            if (result) {
                res.send({ data: result });
            } else {
                res.send(`${search} Not Found`);
            }
        } catch (error) {
            console.log(error);
        }
    },

    searchEvent: async (req, res) => {
        const { q } = req.query;

        try {
            const result = await Event.find({
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
