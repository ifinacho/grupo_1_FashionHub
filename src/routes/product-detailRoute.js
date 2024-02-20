const express = require("express");
const productsController = require("../controllers/productsController");
const router = express.Router();

router.get("/:id", productsController.details);
router.get("/Create-product", productsController.create);
router.get("/:id/edit-product", productsController.edit);

module.exports = router;