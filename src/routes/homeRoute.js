const express = require("express");
const homeController = require("../controllers/homeController");
const router = express.Router();

router.get("/", homeController.index);
//router.get('/Coleccion', homeController.Coleccion)

module.exports = router;