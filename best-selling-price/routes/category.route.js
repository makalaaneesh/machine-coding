const express = require("express");
const router = express.Router();

//Require the controllers

const category_controller = require("../controllers/category.controller");

// a simple test url to check that all our files are communicating correctly
router.get("/test", category_controller.test);
router.post("/create", category_controller.category_create);
router.get("/:id", category_controller.category_details);
router.put("/:id/update", category_controller.category_update);
router.delete("/:id", category_controller.category_delete);
router.get("/", category_controller.categories_list);

module.exports = router;
