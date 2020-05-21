const express = require("express");
const userRoute = require("./user.route");
const bookingRoute = require("./booking.route");

const router = express.Router();

router.use("/users", userRoute);
router.use("/booking", bookingRoute);

module.exports = router;
