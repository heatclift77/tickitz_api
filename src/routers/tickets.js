const express = require("express");
const router = express.Router();
const tickets = require("../controllers/tickets.js");
const cinema = require("../controllers/cinema")
router.post("/", cinema.updateKursi, tickets.createTransaction);
router.get("/", tickets.getTiket);
router.get("/user", tickets.getTiketByIdUser);
router.get("/all", tickets.getTiketAll);

module.exports = router;