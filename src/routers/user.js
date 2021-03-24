const express = require("express");
const router = express.Router();
const user = require("../controllers/user.js");
const auth = require("../auth")
const sendVerification = require('../middlewares/sendVerification')

router
    .post("/register", user.postUser, sendVerification)
    .post('/login', user.login)
    .get('/verifycation/:email', user.verifycation)
    .put("/:id", auth.verify ,user.updateUser)
    .get('/:id', auth.verify ,user.getUserById)

module.exports = router;