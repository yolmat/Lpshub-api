const bcrypt = require("bcrypt");

const userRepository = require("../repositories/user.repository");

const UnauthorizedError = require(
    "../errors/UnauthorizedError"
);

async function login(data) {
    const user = await userRepository.findByEmail(
        data.email
    );

    if (!user) {
        throw new UnauthorizedError(
            "Email ou senha inválidos"
        );
    }

    const passwordMatch = await bcrypt.compare(
        data.password,
        user.password
    );

    if (!passwordMatch) {
        throw new UnauthorizedError(
            "Email ou senha inválidos"
        );
    }

    return {
        id: user.id,
        name: user.name,
        email: user.email,
    };
}

module.exports = {
    login,
};