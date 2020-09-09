const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    avatar: {
        type: String,
        default: "https://cdn.filestackcontent.com/4PWohcEuShaNgAfCcl4D",
    },
    status: {
        type: String,
        default: "PENDING",
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    deposit: {
        type: Number,
        default: 0,
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

const Member = mongoose.model("members", userSchema);

module.exports = Member;
