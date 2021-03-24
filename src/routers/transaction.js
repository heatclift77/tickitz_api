const express = require("express");
const router = express.Router();
const transactions = require("../controllers/transaction.js");

router.delete("/:id", transactions.deleteById);
router.delete(":id", transactions.deleteByIdUser);
router.get("/:page", transactions.getTransactions);
router.get("/user/:id_user/:page", transactions.getTransactionsByUser);

module.exports = router;