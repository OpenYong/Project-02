const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { validationResult } = require("express-validator/check");
const Cart = require("../models/cart");
const user = require("../models/user");

exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("유효성 검사 실패");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      const user = new User({
        name: name,
        email: email,
        password: hashedPassword,
      });
      return user.save();
    })
    .then((result) => {
      const cart = new Cart({ userId: result._id, totalAmount: 0 });
      cart.save();
      result.cart = cart;
      return result.save();
    })
    .then((result) => [
      res.status(201).json({ message: "회원 가입 완료", userId: result._id }),
    ])
    .catch((e) => {
      if (!e.statusCode) {
        e.statusCode = 500;
      }
      next(e);
    });
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let userInfo;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        const error = new Error("사용자가 존재하지 않습니다.");
        error.statusCode = 401;
        throw error;
      }
      userInfo = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isMatch) => {
      if (!isMatch) {
        const error = new Error("비밀번호가 맞지 않습니다.");
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: userInfo.email,
          userId: userInfo._id.toString(),
        },
        "signbyyong",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        userId: userInfo._id.toString(),
        expiresIn: "3600", // expTime(in second)
      });
    })
    .catch((e) => {
      if (!e.statusCode) {
        e.statusCode = 500;
      }
      next(e);
    });
};

// exports.getUserInfo = (req, res, next) => {
//   const userId = req.userId;
//   User.findById(userId)
//     .then((userData) => {
//       if (!userData) {
//         const error = new Error("저장된 데이터 없음");
//         error.statusCode = 404;
//         throw error;
//       }
//       res.status(200).json({ user: userData });
//     })
//     .catch((e) => {
//       if (!e.statusCode) {
//         e.statusCode = 500;
//       }
//       next(e);
//     });
// };
