const { validationResult } = require("express-validator/check");

const Shop = require("../models/shop");
const User = require("../models/user");
const Menu = require("../models/menu");
const Cart = require("../models/cart");
const cart = require("../models/cart");

// CREATE Cart
// exports.createCart = (req, res, next) => {
//   const userId = req.userId;

//   const cart = new Cart({
//     user: userId,
//     items: req.body.items,
//     totalAmount: req.body.totalAmount,
//   });

//   cart
//     .save()
//     .then((result) => {
//       return User.findById(userId);
//     })
//     .then((user) => {
//       user.cart = cart;
//       return user.save();
//     })
//     .then((result) => {
//       console.log(result);
//     })
//     .catch((e) => {
//       if (!e.statusCode) {
//         e.statusCode = 500;
//       }
//       next(e);
//     });
// };

// READ Cart
exports.getCart = (req, res, next) => {
  const userId = req.userId;

  Cart.findOne({ user: userId })
    .then((cart) => {
      if (!cart) {
        const error = new Error("저장된 데이터 없음");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ cart });
    })
    .catch((e) => {
      if (!e.statusCode) {
        e.statusCode = 500;
      }
      next(e);
    });
};

// UPDATE Cart
exports.updateCart = async (req, res, next) => {
  const userId = req.userId;
  const items = req.body.items;
  const totalAmount = req.body.totalAmount;

  const cart = await Cart.findOneAndUpdate(
    { user: userId },
    { items: items, totalAmount: totalAmount }
  );

  cart
    .save()
    .then((result) => {
      res.status(201).json({
        message: "카트 수정 완료",
        cart: result,
      });
    })
    .catch((e) => {
      if (!e.statusCode) {
        e.statusCode = 500;
      }
    });
};
