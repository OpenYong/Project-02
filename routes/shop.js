const express = require("express");
const router = express.Router();

const shopController = require("../controllers/shop");

router.get("/lists", shopController.getShopsData);

module.exports = router;
