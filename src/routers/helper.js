const express = require("express");
const router = express.Router();
const helper = require('../controllers/helper')

router.get('/data_kota', helper.data_kota)

module.exports = router