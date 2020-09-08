let bcrypt = require("bcryptjs");

const hash = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    return hashed;
};

const compare = async (password, hashed) => {
    const result = await bcrypt.compare(password, hashed);

    return result;
};

module.exports = { hash, compare };
