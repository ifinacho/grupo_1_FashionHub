const express = require("express");
const homeController = require("../controllers/homeController");
const router = express.Router();

router.get("/", homeController.index);
router.get('/:category', homeController.Colect)
router.get('/results/search', homeController.search); 

module.exports = router;