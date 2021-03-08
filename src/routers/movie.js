const express = require("express");
const router = express.Router();
const movie = require("../controllers/movie");

router.post("/addMovie", movie.postMovie);
router.get("/:page", movie.getMovie);
router.get("/id/:id", movie.getMovieById);
router.get("/search/:key", movie.searchMovie);


module.exports = router;