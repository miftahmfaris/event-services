const { PORT, MONGODB_URI, JWT_SECRET } = require("./environment");
const db = require("./database");

module.exports = {
    db,
    PORT,
    MONGODB_URI,
    JWT_SECRET,
};
