const express = require("express");
const productsController = require("../controllers/createProductController");
const router = express.Router();

//CREATE - NO MANDA A LA PAGINA EXACTA
router.get("/create-product", productsController.create);
router.post("/create-product", productsController.createPost);

module.exports = router