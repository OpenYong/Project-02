const { validationResult } = require("express-validator/check");

const Shop = require("../models/shop");
const User = require("../models/user");
const Menu = require("../models/menu");
const Cart = require("../models/cart");
const Order = require("../models/order");

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
  const { items, totalAmount, shopId } = req.body;

  const cart = await Cart.findOneAndUpdate(
    { user: userId },
    { items: items, totalAmount: totalAmount, shopId: shopId }
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

// CREATE Order
exports.createOrder = (req, res, next) => {
  const userId = req.userId;
  const shopId = req.params.shopId;

  const { orderedItems, tel, totalAmount } = req.body;

  Shop.findById(shopId)
    .then((result) => {
      const order = new Order({
        user: userId,
        tel: tel,
        orderedItems: orderedItems,
        totalAmount: totalAmount,
        status: "주문 완료",
        shop: shopId,
        shopName: result.shopName,
        imageUrl: result.imageUrl,
      });

      order
        .save()
        .then((result) => {
          return User.findById(userId);
        })
        .then((user) => {
          user.orders.push(order);
          return user.save();
        })
        .then((result) => {
          res.status(201).json({
            message: "주문 등록 완료",
            order: order,
          });
        })
        .catch((e) => {
          if (!e.statusCode) {
            e.statusCode = 500;
          }
          next(e);
        });
    })
    .catch();
};

// READ Order
exports.getOrder = (req, res, next) => {
  const userId = req.userId;

  Order.find({ user: userId })
    .then((result) => {
      console.log(result);
      if (!result) {
        const error = new Error("저장된 데이터 없음");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ orders: result });
    })
    .catch((e) => {
      if (!e.statusCode) {
        e.statusCode = 500;
      }
      next(e);
    });
};
