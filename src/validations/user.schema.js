const { z } = require("zod");

const createUserSchema = z.object({
    name: z.string(),
    email: z.email("Email invalido"),
    password: z.string().min(6, "A senha precisa ter no minimo 6 caracteres"),
    phone: z.string().optional(),
});

module.exports = {
    createUserSchema,
}