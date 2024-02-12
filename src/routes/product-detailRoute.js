const express = require("express");
const productsController = require("../controllers/productsController");
const router = express.Router();

router.get("/", productsController.details);
router.get("/Create-product", productsController.create);
router.get("/edit-product", productsController.edit);

module.exports = router;