const express = require("express");
const router = express.Router();
const tickets = require("../controllers/tickets.js");

router.post("/buyTickets", tickets.postTickets);

module.exports = router;