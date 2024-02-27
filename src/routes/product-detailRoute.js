const express = require("express");
const productsController = require("../controllers/productsController");
const router = express.Router();

router.get("/", productsController.index);
//DETAILS
router.get("/:id", productsController.details);

//EDIT - FUNCIONA
router.get("/edit-product/:id", productsController.edit);
router.put("/edit-product/:id", productsController.editPut);

//DELETE
router.delete("/:id", productsController.delete);

module.exports = router;