const express = require("express");
const router = express.Router();
const movie = require("../controllers/movie");
const upload = require("../middlewares/imageUploadConfig");

router.post("/", upload, movie.postMovie);
router.get("/", movie.getMovie);
router.get("/details", movie.getMovieById);
router.get("/search", movie.searchMovie);


module.exports = router;