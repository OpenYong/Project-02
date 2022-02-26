const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/authentication");

const { body } = require("express-validator/check");

const shopController = require("../controllers/shop");

router.get("/lists", shopController.getShopsData);

router.get("/list/:shopId", shopController.getShop);

router.post(
  "/register",
  isAuth,
  [
    body("name").trim().isLength({ min: 2 }),
    body("description").trim().isLength({ min: 10 }),
  ],
  shopController.registerShop
);

module.exports = router;
