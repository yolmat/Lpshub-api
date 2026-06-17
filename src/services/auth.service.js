const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

    const token = jwt.sign(
        {
            sub: user.id,
            email: user.email,
            name: user.name,
        },
        process.env.JWT_SECRET,
        {
            expiresIn:
                process.env.JWT_EXPIRES_IN || "1d",
        }
    );

    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        },
        token
    };
}

module.exports = {
    login,
};