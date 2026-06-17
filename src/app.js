const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const userRoutes = require("./routes/user.routes");
const authRoutes = require("./routes/auth.routes");
const financialRoutes = require("./routes/financial.routes")
const errorMiddleware = require("./middlewares/error.middleware");
const authMiddleware = require("./middlewares/auth.middleware");

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

// Rotas Publico
app.use("/auth", authRoutes);

// JWT
app.use(authMiddleware);

// Rotas Privado
app.use("/users", userRoutes);

// Import
app.use("/financial", financialRoutes);

// Validador de erros
app.use(errorMiddleware);

module.exports = app;