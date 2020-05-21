const express = require("express");
const router = express.Router();

//Require the controllers

const booking_controller = require("../controllers/booking.controller");

/**
 * Health check
 */
router.get("/test", booking_controller.test);

/**
 * Create booking
 */
router.post("/create", booking_controller.create);

/**
 * Update booking status (open, running, closed)
 */
router.put("/:id/status", booking_controller.update_status);

/**
 * Get all bookings
 */
router.get("/", booking_controller.get_all_bookings);

/**
 * Get all bookings by user
 */
router.get("/user/:id", booking_controller.get_bookings_by_user);

module.exports = router;
