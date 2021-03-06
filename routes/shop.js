const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/authentication");

const { body } = require("express-validator/check");

const shopController = require("../controllers/shop");

router.get("/lists", shopController.getShopsData);

router.get("/list/:shopId", shopController.getShop);

router.get("/myshops", isAuth, shopController.getMyShops);

router.post(
  "/register",
  isAuth,
  [
    body("name").trim().isLength({ min: 2 }),
    body("description").trim().isLength({ min: 10 }),
  ],
  shopController.registerShop
);

router.put(
  "/list/:shopId",
  isAuth,
  [
    body("name").trim().isLength({ min: 2 }),
    body("description").trim().isLength({ min: 10 }),
  ],
  shopController.updateShop
);

router.delete("/list/:shopId", isAuth, shopController.deleteShop);

// CRUD Menu
router.post("/menu/:shopId", isAuth, shopController.registerMenu);

router.get("/menu/:shopId", shopController.getMenu);

router.put("/menu/:menuId", isAuth, shopController.updateMenu);

router.delete("/menu/:menuId", isAuth, shopController.deleteMenu);

module.exports = router;
