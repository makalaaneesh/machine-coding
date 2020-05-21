const express = require("express");
const router = express.Router();

//Require the controllers

const user_controller = require("../controllers/user.controller");

/**
 * Health check
 */
router.get("/health", user_controller.test);
/**
 * create a new user
 */
router.post("/create", user_controller.user_create);

/**
 * Update location
 */
router.put("/:id/update_user_location", user_controller.user_update_location);

/**
 * Get users list
 */
router.get("/", user_controller.users_list);

/**
 * Toggle availability
 */
router.put(
  "/:id/toggle-availability",
  user_controller.user_toggle_availability
);

/**
 * Get list of available drivers
 */
router.get("/available-drivers", user_controller.list_available_drivers);

module.exports = router;
