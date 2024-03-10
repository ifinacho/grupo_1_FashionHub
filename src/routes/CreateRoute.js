const express = require("express");
const productsController = require("../controllers/createProductController");
const uploadFile = require("../middlewares/uploadFile.js");
const router = express.Router();

//CREATE - NO MANDA A LA PAGINA EXACTA
router.get("/create-product", productsController.create);
router.post("/create-product", uploadFile.single('image'), productsController.createPost);

module.exports = router
