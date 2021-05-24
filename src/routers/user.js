const express = require("express");
const router = express.Router();
const user = require("../controllers/user.js");
const auth = require("../auth");
const sendVerification = require("../middlewares/sendVerification");
const upload = require("../middlewares/imageUploadConfig")
router
    .post("/admin/getCinema", user.getCinema)
    .post("/register", user.postUser, sendVerification)
    .post("/login", user.login)
    .post("/forgotpass", user.HandleForgotPass)
    .post("/ValidasIToken", auth.tokenValidation, user.sendDataUser)
    .put("/img_profile", upload, user.updateImgProfil)
    .put("/profil/:id", auth.verify ,user.updateUser)
    .put("/profil/setPass/:id", auth.verify ,user.setPassword)
    .put("/confirmNewPass", user.confirmNewPass)
    .get("/verifycation/:email", user.verifycation)
    .get("/:id", auth.verify ,user.getUserById)
    .get("/admin/getKota", user.getKota)

module.exports = router;