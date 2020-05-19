const express = require("express");
const router = express.Router();

//Require the controllers

const transaction_controller = require("../controllers/transaction.controller");

// a simple test url to check that all our files are communicating correctly
router.get("/test", transaction_controller.test);

router.post("/create", transaction_controller.transaction_create);

router.get("/user/:userid", transaction_controller.transactions_by_userid);

router.put("/:id/update", transaction_controller.transaction_update);

// Get balance amount with another user
router.get("/balance", transaction_controller.balance_with_user);

router.delete("/:id", transaction_controller.transaction_delete);

router.get("/", transaction_controller.transactions_list);

module.exports = router;
