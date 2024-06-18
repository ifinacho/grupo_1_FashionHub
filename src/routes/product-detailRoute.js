const express = require("express");
const productsController = require("../controllers/productsController");
const uploadFile = require("../middlewares/uploadFile.js");
const router = express.Router();

router.get("/:id", productsController.details);

router.get("/edit-product/:id", productsController.edit);
router.put("/edit-product/:id", uploadFile.single('image'), productsController.editPut);

//DELETE
router.delete("/:id", productsController.delete);

module.exports = router;