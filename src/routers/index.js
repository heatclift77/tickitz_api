const express = require("express");
const router = express.Router();
const transactions = require("./transaction");
const movie = require("./movie");
const ticket = require("./tickets");
const user = require("./user");
const Product = require("./Products");
const list_tayang = require('./jadwal_tayang')
const helper = require('./helper')
const cinema = require("./cinema")


router.use("/product", Product);
router.use("/transaction", transactions);
router.use("/user", user);
router.use("/ticket", ticket);
router.use("/movie", movie);
router.use("/cinema_list", list_tayang);
router.use("/helpers", helper)
router.use("/cinema", cinema)

module.exports = router;