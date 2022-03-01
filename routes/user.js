const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/authentication");

const { body } = require("express-validator/check");

const userController = require("../controllers/user");

// router.post("/cart", isAuth, userController.createCart);

router.get("/cart", isAuth, userController.getCart);

router.put("/cart", isAuth, userController.updateCart);

module.exports = router;
