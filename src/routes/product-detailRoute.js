const express = require("express");
const productsController = require("../controllers/productsController");
const router = express.Router();

router.get("/", productsController.details);

module.exports = router;