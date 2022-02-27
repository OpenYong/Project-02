const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/authentication");

const { body } = require("express-validator/check");

const User = require("../models/user");
const authController = require("../controllers/auth");

router.put(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("이메일을 입력해주세요.")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("가입한 이메일이 존재합니다!");
          }
        });
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 6 }),
    body("name").trim().not().isEmpty(),
  ],
  authController.signup
);

router.post("/login", authController.login);

// router.get("/info", isAuth, authController.getUserInfo);

module.exports = router;
