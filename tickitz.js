const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

// my router
const router = require("./src/routers");
// --------

// midleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/v1", router);
app.use("/img", express.static(__dirname + "/src/cover-movie"));
app.use("/cinema_img", express.static(__dirname + "/src/assets"));
app.listen(process.env.PORT, ()=>{
    console.log(`running on port ${process.env.PORT}`);
});