const { z } = require("zod");

const loginSchema = z.object({
    email: z
        .email("Email inválido")
        .trim()
        .toLowerCase(),

    password: z
        .string({
            required_error: "Senha é obrigatória",
        })
});

module.exports = {
    loginSchema,
};