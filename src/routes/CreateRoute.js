const express = require("express");
const productsController = require("../controllers/productsController");
const uploadFile = require("../middlewares/uploadFile.js");
const router = express.Router();

router.get("/create-product", productsController.create);
router.post("/create-product", uploadFile.single('image'), productsController.createPost);

module.exports = router
