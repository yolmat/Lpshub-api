const bcrypt = require("bcrypt");

const repository = require("../repositories/user.repository");

async function createUser(data) {
    const hash = await bcrypt.hash(data.password, 10);

    return repository.create({
        ...data,
        password: hash,
    });
}

module.exports = {
    createUser,
};