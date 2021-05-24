const express = require("express");
const router = express.Router();
const Product = require("../controllers/Products");
const upload = require("../middlewares/imageUploadConfig");

router.post("/", upload, Product.postProduct);
// router.post('/getProduct', Product.sendProductById)

module.exports = router;