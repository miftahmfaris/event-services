const mongoose = require("mongoose");

const { MONGODB_URI } = require("./environment");

mongoose
    .connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => {
        console.log("Success connect to database");
    })
    .catch((error) => {
        console.log(error);
    });

const db = mongoose.connection;

module.exports = db;
