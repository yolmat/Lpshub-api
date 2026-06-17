const bcrypt = require("bcrypt");

const repository = require("../repositories/user.repository");
const ConflictError = require("../errors/ConflictError");

async function createUser(data) {

    // Verifica se o usuario já existe
    const userExists = await repository.findByEmail(data.email);

    // Tratando erro de usuario já existente
    if (userExists) {
        throw new ConflictError(
            "Email já cadastrado"
        );
    }

    // hash password
    const passwordHash = await bcrypt.hash(data.password, 10);

    // Cria o usuario
    const user = await repository.create({
        name: data.name,
        email: data.email,
        password: passwordHash
    });

    return user
}

module.exports = {
    createUser
}