const express = require("express");
const router = express.Router();
const signIn = require("../controllers/signIn");

router.get("/", signIn.login);

module.exports = router;