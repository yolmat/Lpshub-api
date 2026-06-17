const service = require("../services/user.service");

async function create(req, res, next) {

    try {
        const user = await service.createUser(
            req.body
        );

        return res.status(201).json(user);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    create
}