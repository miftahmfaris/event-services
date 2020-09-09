const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "ACTIVE",
    },
    image: {
        type: String,
    },
    price: {
        type: Number,
        default: 0,
    },
    startAt: {
        type: Date,
    },
    endAt: {
        type: Date,
    },
    createdBy: {
        type: String,
    },
    updatedBy: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const Event = mongoose.model("events", eventSchema);

module.exports = Event;
