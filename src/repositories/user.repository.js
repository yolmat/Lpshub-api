const prisma = require("../lib/prisma");

async function findByEmail(email) {
    return prisma.user.findUnique({
        where: {
            email,
        },
    });
}

async function create(data) {
    return prisma.user.create({
        data,
        select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            createdAt: true,
        },
    });
}

module.exports = {
    create,
    findByEmail
}