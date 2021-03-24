const express = require("express");
const router = express.Router();
const Product = require('../controllers/Products')

router.post('/', Product.postProduct)

module.exports = router