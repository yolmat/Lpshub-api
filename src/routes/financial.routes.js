const express = require("express");

const {
    importSales
} = require("../controllers/financial.controller");

const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.post(
    "/import",
    authMiddleware,
    importSales
);

module.exports = router;