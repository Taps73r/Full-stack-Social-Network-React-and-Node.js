const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const subscriptionRoutes = require("./routes/subscription");
const postRoutes = require("./routes/post");
const commentsRoutes = require("./routes/comments");
const userRouter = require("./routes/users");
const chatRouter = require("./routes/chat");

const app = express();
const port = 3002;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Помилка підключення до MongoDB:"));
db.once("open", function () {
  console.log("Підключено до бази даних MongoDB");
});
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use(bodyParser.json({ limit: "50mb" }));

app.use("/auth", authRoutes);
app.use("", profileRoutes);
app.use("", subscriptionRoutes);
app.use("", postRoutes);
app.use("", commentsRoutes);
app.use("", userRouter);
app.use("", chatRouter);

app.post("/protected", (req, res) => {
  const token = req.body.token;

  if (!token) {
    return res.status(401).json({
      message:
        "Ваш сеанс аутентифікації закінчився. Будь ласка, увійдіть знову для продовження роботи.",
    });
  }

  jwt.verify(token, "secret_key", (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message:
          "Ваш сеанс аутентифікації закінчився. Будь ласка, увійдіть знову для продовження роботи.",
      });
    }

    res.json({
      message: "Доступ дозволено",
      username: decoded.username,
      userId: decoded.userId,
      token,
    });
  });
});

app.listen(port, () => {
  console.log(`Сервер слухає на порту ${port}`);
});
