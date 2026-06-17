const router = require("express").Router();

const controller = require("../controllers/user.controller");

const validation = require("../middlewares/validate.middleware")

const { createUserSchema } = require("../validations/user.schema");

router.post("/create", validation(createUserSchema), controller.create);

module.exports = router;