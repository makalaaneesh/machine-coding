const express = require("express");
const router = express.Router();

//Require the controllers

const user_controller = require("../controllers/user.controller");

// a simple test url to check that all our files are communicating correctly
/**
 * @swagger
 * /api/users/test:
 *  get:
 *      description: Test route
 *      responses:
 *          '200':
 *              'description': A success response
 *
 */
router.get("/test", user_controller.test);
router.post("/create", user_controller.user_create);
router.get("/:id", user_controller.user_details);
router.put("/:id/update", user_controller.user_update);
router.delete("/:id", user_controller.user_delete);
router.get("/", user_controller.users_list);

module.exports = router;
