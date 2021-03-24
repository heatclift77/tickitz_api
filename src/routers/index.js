const express = require("express");
const router = express.Router();
const transactions = require("./transaction");
const movie = require('./movie')
const ticket = require("./tickets");
const user = require("./user");
const Product = require('./Products')


router.use("/product", Product);
router.use("/transaction", transactions);
router.use("/user", user);
router.use("/tickets", ticket);
router.use('/movie', movie)

module.exports = router;