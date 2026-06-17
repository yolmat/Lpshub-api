const AppError = require("./AppError");

class BadRequestError extends AppError {
    constructor(message = "Dados inválidos") {
        super(message, 400);
    }
}

module.exports = BadRequestError;