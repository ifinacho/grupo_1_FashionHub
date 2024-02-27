const express = require("express");
const shoppingCartController = require("../controllers/shoppingCartController");
const router = express.Router();

router.get("/", shoppingCartController.index);
router.post("/", shoppingCartController.checkout);
module.exports = router;