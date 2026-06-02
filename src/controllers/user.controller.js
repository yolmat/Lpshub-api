const service = require("../services/user.service");

async function create(req, res) {
    const user = await service.createUser(req.body);

    return res.status(201).json(user);
}

module.exports = {
    create,
};