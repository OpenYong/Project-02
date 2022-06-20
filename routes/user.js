const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/authentication");

const { body } = require("express-validator/check");

const userController = require("../controllers/user");

// router.post("/cart", isAuth, userController.createCart);

router.get("/cart", isAuth, userController.getCart);

router.put("/cart", isAuth, userController.updateCart);

router.post("/order/:shopId", isAuth, userController.createOrder);

router.get("/order", isAuth, userController.getOrder);
// router.put("/order", isAuth, userController.updateOrder);

router.get("/account/profile", isAuth, userController.getUserData);

module.exports = router;
