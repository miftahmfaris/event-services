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
        defaultValue: 0,
    },
    amount: {
        type: Number,
        allowNull: false,
        defaultValue: 0,
    },
    balance: {
        type: Number,
        allowNull: false,
        defaultValue: 0,
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

const Deposit = mongoose.model("deposits", depositSchema);

module.exports = Deposit;
