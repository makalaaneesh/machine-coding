const express = require("express");
const productRoute = require("./product.route");
const userRoute = require("./user.route");
const transactionRoute = require("./transaction.route");

const router = express.Router();

router.use("/products", productRoute);
router.use("/users", userRoute);
router.use("/transaction", transactionRoute);

module.exports = router;
