const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

// my router
const router = require("./src/routers");
// --------
// module
// const movie = require("./src/routers/movie");
// const cinema = require("./src/routers/cinema");
// const jadwal_tayang = require("./src/routers/jadwal_tayang");
// 

// midleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use("/v1/cinemas", cinema);
// app.use("/v1/jadwal_tayang", jadwal_tayang);
app.use("/v1", router);
app.use('/img', express.static(__dirname + '/src/cover-movie'));
app.listen(process.env.PORT, ()=>{
    console.log(`running on port ${process.env.PORT}`);
});