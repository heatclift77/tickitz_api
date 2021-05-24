const express = require("express");
const router = express.Router();
const jadwalTayang = require("../controllers/jadwal_tayang");

router.get("/", jadwalTayang.getJadwalList)
        .get("/specific/", jadwalTayang.jadwalTayangByDate)


module.exports = router;