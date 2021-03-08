const express = require("express");
const router = express.Router();
const transactions = require("./transaction");
// const signUp = require('signUp')
// const signIn = require('signIn')
// const movie = require('movie')
const ticket = require("./tickets");
const user = require("./user");
// const cinema = require('cinema')
// const jadwal = require('jadwal_tayang')

router.use("/transaction", transactions);
router.use("/user", user);
router.use("/tickets", ticket);

module.exports = router;