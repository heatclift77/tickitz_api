const express = require("express");
const router = express.Router();
const cinema = require("../controllers/cinema");

router.post("/addCinema", cinema.postCinema);
router.get("/:id_movie", cinema.getCinemaByIdMovie);


module.exports = router;