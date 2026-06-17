const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const userRoutes = require("./routes/user.routes");
const errorMiddleware = require("./middlewares/error.middleware");
const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use(errorMiddleware);

module.exports = app;