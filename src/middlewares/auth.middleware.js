const jwt = require("jsonwebtoken");

const UnauthorizedError = require(
    "../errors/UnauthorizedError"
);

function authMiddleware(req, res, next) {
    const authHeader =
        req.headers.authorization;

    if (!authHeader) {
        throw new UnauthorizedError(
            "Token não informado"
        );
    }

    const [type, token] =
        authHeader.split(" ");

    if (type !== "Bearer") {
        throw new UnauthorizedError(
            "Tipo de token inválido"
        );
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = {
            id: decoded.sub,
            email: decoded.email,
            name: decoded.name,
        };

        next();
    } catch {
        throw new UnauthorizedError(
            "Token inválido ou expirado"
        );
    }
}

module.exports = authMiddleware;