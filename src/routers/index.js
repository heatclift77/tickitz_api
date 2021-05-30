const express = require("express");
const router = express.Router();
const movie = require("./movie");
const ticket = require("./tickets");
const user = require("./user");
const cinema = require("./cinema")


router.use("/user", user);
router.use("/ticket", ticket);
router.use("/movie", movie);
router.use("/cinema", cinema)

module.exports = router;