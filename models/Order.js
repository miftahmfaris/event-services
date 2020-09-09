const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    eventID: {
        type: Schema.Types.ObjectId,
        ref: "events",
    },
    memberID: {
        type: Schema.Types.ObjectId,
        ref: "members",
    },
    ticketNumber: {
        type: String,
        required: true,
    },
    participantStatus: {
        type: String,
        default: "PENDING",
    },
    status: {
        type: String,
        default: "PENDING",
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

const Order = mongoose.model("orders", orderSchema);

module.exports = Order;
