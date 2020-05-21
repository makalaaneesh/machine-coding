const express = require("express");
const router = express.Router();

//Require the controllers

const product_controller = require("../controllers/product.controller");

// a simple test url to check that all our files are communicating correctly
router.get("/test", product_controller.test);
router.post("/create", product_controller.product_create);
router.get("/get/:id", product_controller.product_details);
router.put("/:id/update", product_controller.product_update);
router.delete("/:id", product_controller.product_delete);
router.get("/", product_controller.products_list);
router.post("/purchase", product_controller.product_purchase);
router.get("/best-seller", product_controller.product_best_seller);
module.exports = router;
