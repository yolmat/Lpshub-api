const prisma = require("../lib/prisma");

async function create(data) {
    return prisma.user.create({
        data,
    });
}

module.exports = {
    create,
};