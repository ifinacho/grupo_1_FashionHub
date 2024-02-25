const express = require("express");
const productsController = require("../controllers/productsController");
const router = express.Router();

router.get("/", productsController.index);
//DETAILS
router.get("/:id", productsController.details);

//CREATE
router.get("/product-detail/Create-product", productsController.create);
router.post("/Create-product", productsController.createPost);

//EDIT
router.post("/edit-product/:id", productsController.edit);
router.put("/:id", productsController.editPut);

//DELETE
router.delete("/:id", productsController.delete);

module.exports = router;