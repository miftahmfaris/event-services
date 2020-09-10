const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const depositSchema = new Schema({
    memberID: {
        type: Schema.Types.ObjectId,
        ref: "members",
    },
    previousBalance: {
        type: Number,
        allowNull: false,
        default: 0,
    },
    amount: {
        type: Number,
        allowNull: false,
        default: 0,
    },
    balance: {
        type: Number,
        allowNull: false,
        default: 0,
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
    approvedBy: {
        type: String,
    },
});

const Deposit = mongoose.model("deposits", depositSchema);

module.exports = Deposit;
