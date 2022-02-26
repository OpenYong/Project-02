require("dotenv").config();
const { MONGO_URI } = process.env;

const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");

const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

const app = express();
const port = 8080;

// 이미지 업로드
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(bodyParser.json());
// 이미지 다운로드
app.use("/images", express.static(path.join(__dirname, "images")));
// 이미지 업로드
app.use(multer({ storage: storage, fileFilter: fileFilter }).single("image"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/shop", shopRoutes);
app.use("/auth", authRoutes);

// 모든 에러 발생시 이 미들웨어에서 캐치하도록 함
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500; // 디폴트 코드 500
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message, data });
});

mongoose
  .connect(MONGO_URI)
  .then((result) => {
    console.log("Mongo DB connetion 성공");
    app.listen(port, () => {
      console.log(`Express port ${port} 연결`);
    });
  })
  .catch((e) => console.log(e));
