const { validationResult } = require("express-validator/check");
const fs = require("fs");
const path = require("path");

const Shop = require("../models/shop");
const User = require("../models/user");
const Menu = require("../models/menu");
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

// CREATE SHOP
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

//READ Shops(:userId)
exports.getMyShops = (req, res, next) => {
  const userId = req.userId;
  Shop.find({ ownerId: userId })
    .then((shopData) => {
      if (!shopData) {
        const error = new Error("저장된 데이터 없음");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ shops: shopData });
    })
    .catch((e) => {
      if (!e.statusCode) {
        e.statusCode = 500;
      }
      next(e);
    });
};

// UPDATE SHOP
exports.updateShop = (req, res, next) => {
  const userId = req.userId;
  const shopId = req.params.shopId;
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
  Shop.findById(shopId)
    .then((shopData) => {
      if (!shopData) {
        const error = new Error("저장된 데이터 없음");
        error.statusCode = 404;
        throw error;
      }
      if (shopData.imageUrl !== req.file.path) {
        imagePath = path.join(__dirname, "..", shopData.imageUrl);
        fs.unlink(imagePath, (e) => console.log(e));
      }
      shopData.description = req.body.description;
      shopData.hasTables = req.body.hasTables;
      shopData.hasParkingLot = req.body.hasParkingLot;
      shopData.imageUrl = req.file.path;
      return shopData.save();
    })
    .then((result) => {
      res.status(200).json({ shop: result });
    })
    .catch((e) => {
      if (!e.statusCode) {
        e.statusCode = 500;
      }
      next(e);
    });
};

// DELETE SHOP
exports.deleteShop = (req, res, next) => {
  const userId = req.userId;
  const shopId = req.params.shopId;

  Shop.findById(shopId)
    .then((shopData) => {
      if (!shopData) {
        const error = new Error("저장된 데이터 없음");
        error.statusCode = 404;
        throw error;
      }
      imagePath = path.join(__dirname, "..", shopData.imageUrl);
      fs.unlink(imagePath, (e) => console.log(e));

      return Shop.findByIdAndRemove(shopId);
    })
    .then(() => {
      return User.findById(userId);
    })
    .then((user) => {
      user.shops.pull(shopId);
      return user.save();
    })
    .then((result) => {
      return Menu.remove({ shop: shopId });
    })
    .then((result) => {
      res.status(200).json({ message: "데이터 삭제 완료." });
    })
    .catch((e) => {
      if (!e.statusCode) {
        e.statusCode = 500;
      }
      next(e);
    });

  // Menu.find({ shop: userId })
  // .then
};

// CREATE Menu
exports.registerMenu = (req, res, next) => {
  const shopId = req.params.shopId;
  const menu = new Menu({
    name: req.body.name,
    description: req.body.description,
    imageUrl: req.file.path,
    price: req.body.price,
    shop: shopId,
  });
  menu
    .save()
    .then((result) => {
      return Shop.findById(shopId);
    })
    .then((shop) => {
      console.log(shop);
      if (!shop.menu) {
        shop.menu = menu;
      } else {
        shop.menu.push(menu);
      }
      return shop.save();
    })
    .then((result) => {
      res.status(201).json({
        message: "메뉴 등록 완료",
        menu: menu,
      });
    })
    .catch((e) => {
      if (!e.statusCode) {
        e.statusCode = 500;
      }
      next(e);
    });
};

// READ Menu
exports.getMenu = (req, res, next) => {
  const shopId = req.params.shopId;

  Menu.find({ shop: shopId })
    .then((menuData) => {
      if (!menuData) {
        const error = new Error("저장된 데이터 없음");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ menu: menuData });
    })
    .catch((e) => {
      if (!e.statusCode) {
        e.statusCode = 500;
      }
      next(e);
    });
};

// UPDATE Menu
exports.updateMenu = (req, res, next) => {
  const menuId = req.params.menuId;

  if (!req.file) {
    const error = new Error("이미지 없음");
    error.statusCode = 422;
    throw error;
  }

  Menu.findById(menuId)
    .then((menuData) => {
      if (!menuData) {
        const error = new Error("저장된 데이터 없음");
        error.statusCode = 404;
        throw error;
      }
      if (menuData.imageUrl !== req.file.path) {
        imagePath = path.join(__dirname, "..", menuData.imageUrl);
        fs.unlink(imagePath, (e) => console.log(e));
      }
      menuData.description = req.body.description;
      menuData.price = req.body.price;
      menuData.imageUrl = req.file.path;
      return menuData.save();
    })
    .then((result) => {
      res.status(200).json({ menu: result });
    })
    .catch((e) => {
      if (!e.statusCode) {
        e.statusCode = 500;
      }
      next(e);
    });
};

// DELETE Menu
exports.deleteMenu = (req, res, next) => {
  const menuId = req.params.menuId;
  const userId = req.userId;

  Menu.findById(menuId)
    .then((menuData) => {
      if (!menuData) {
        const error = new Error("저장된 데이터 없음");
        error.statusCode = 404;
        throw error;
      }
      imagePath = path.join(__dirname, "..", menuData.imageUrl);
      fs.unlink(imagePath, (e) => console.log(e));

      return Menu.findByIdAndRemove(menuId);
    })
    .then((result) => {
      return Shop.findOne({ ownerId: userId });
    })
    .then((shop) => {
      shop.menu.pull(menuId);
      return shop.save();
    })
    .then(() => {
      res.status(200).json({ message: "데이터 삭제 완료." });
    })
    .catch((e) => {
      if (!e.statusCode) {
        e.statusCode = 500;
      }
      next(e);
    });
};
