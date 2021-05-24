const express = require("express");
const router = express.Router();
const cinema = require("../controllers/cinema");
const upload = require("../middlewares/imageUploadConfig")

router.post("/", upload, cinema.addCinema);
router.get("/", cinema.getAllCinema);
router.get("/sort", cinema.getCinemaByKota);


module.exports = router;