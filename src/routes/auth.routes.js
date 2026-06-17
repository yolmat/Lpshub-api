const router = require("express").Router();

const controller = require("../controllers/auth.controller");

const validate = require("../middlewares/validate.middleware");

const { loginSchema, } = require("../validations/auth.schema");

router.post("/login", validate(loginSchema), controller.login);

module.exports = router;