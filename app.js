require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const { MONGO_URI } = process.env;

const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

const app = express();
const port = 8080;

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/shop", shopRoutes);
app.use("/auth", authRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
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
