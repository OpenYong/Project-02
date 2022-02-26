const Shop = require("../models/shop");
const User = require("../models/user");

const { validationResult } = require("express-validator/check");
const user = require("../models/user");

exports.getShopsData = (req, res, next) => {
  Shop.find()
    .then((shopsData) => {
      res.status(200).json(shopsData);
    })
    .catch((e) => {
      if (!e.statusCode) {
        e.statusCode = 500;
      }
      next(e);
    });
};

exports.getShop = (req, res, next) => {
  const shopId = req.params.shopId;
  Shop.findById(shopId)
    .then((shopData) => {
      if (!shopData) {
        const error = new Error("저장된 데이터 없음");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ shop: shopData });
    })
    .catch((e) => {
      if (!e.statusCode) {
        e.statusCode = 500;
      }
      next(e);
    });
};

exports.registerShop = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("유효성 검사 실패");
    error.statusCode = 422;
    throw error;
  }
  if (!req.file) {
    const error = new Error("이미지 없음");
    error.statusCode = 422;
    throw error;
  }
  let owner;
  const shop = new Shop({
    ownerId: req.userId,
    shopName: req.body.name,
    imageUrl: req.file.path,
    description: req.body.description,
    hasTables: req.body.hasTables,
    hasParkingLot: req.body.hasParkingLot,
  });
  shop
    .save()
    .then((result) => {
      return User.findById(req.userId);
    })
    .then((user) => {
      user.shops.push(shop);
      return user.save();
    })
    .then((result) => {
      res.status(201).json({
        message: "카페 등록 완료",
        shop: shop,
      });
    })
    .catch((e) => {
      if (!e.statusCode) {
        e.statusCode = 500;
      }
      next(e);
    });
};
