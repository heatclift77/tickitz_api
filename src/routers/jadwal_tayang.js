const express = require('express')
const router = express.Router()
const jadwalTayang = require('../controllers/jadwal_tayang')

router.post('/add', jadwalTayang.postJadwal)
router.get('/:id_cinema', jadwalTayang.getByIdCinema)


module.exports = router