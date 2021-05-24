const express = require("express");
const router = express.Router();
const transactions = require("../controllers/transaction.js");

router.delete("/:id", transactions.deleteById)
.delete(":id", transactions.deleteByIdUser)
.get("/:page", transactions.getTransactions)
.get("/user/:id_user/:page", transactions.getTransactionsByUser)
.post("/checkout", transactions.CheckOut)


module.exports = router;