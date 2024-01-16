const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;

const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const subscriptionRoutes = require("./routes/subscription");
const postRoutes = require("./routes/post");
const commentsRoutes = require("./routes/comments");

const app = express();
const port = 3002;

cloudinary.config({
  cloud_name: "duoxvyirq",
  api_key: "872646555943858",
  api_secret: "8FumT857SXwXJz7dRs-mwCRBJpY",
});

const Subscription = require("./Schema/subscription");
const Profile = require("./Schema/profileSchema");

const mongoURI =
  "mongodb+srv://taps73r:motherboard2005@cluster0.rx59bw7.mongodb.net/?retryWrites=true&w=majority";
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

app.post("/protected", (req, res) => {
  const token = req.body.token;

  if (!token) {
    return res.status(401).json(console.log("Немає токену"));
  }

  jwt.verify(token, "secret_key", (err, decoded) => {
    if (err) {
      console.error("JWT verification error:", err);
      return res.status(401).json(console.log("Немає токену"));
    }

    res.json({
      message: "Доступ дозволено",
      username: decoded.username,
      userId: decoded.userId,
      token,
    });
  });
});

// /users-info endpoint
app.get("/users-info", async (req, res) => {
  try {
    const { term, page = 1, count = 6 } = req.query;
    let profileQuery = {};

    if (term) {
      profileQuery = { name: { $regex: new RegExp(term), $options: "i" } };
    }

    // Отримати всі профайли користувачів з бази даних з можливістю пошуку за іменем
    const skip = (page - 1) * count;
    const allProfiles = await Profile.find(profileQuery)
      .skip(skip)
      .limit(parseInt(count));

    // Отримати інформацію про підписки для кожного користувача
    const subscriptions = await Subscription.find();

    // Додати інформацію про підписки та підписників до кожного користувача
    const usersWithSubscriptions = await Promise.all(
      allProfiles.map(async (userProfile) => {
        const userSubscriptions = subscriptions
          .filter(
            (subscription) =>
              subscription.follower.toString() === userProfile.userId.toString()
          )
          .map((subscription) => subscription.following);

        const followers = subscriptions
          .filter(
            (subscription) =>
              subscription.following.toString() ===
              userProfile.userId.toString()
          )
          .map((subscription) => subscription.follower);

        return {
          userId: userProfile.userId,
          name: userProfile.name,
          bio: userProfile.bio,
          photo: userProfile.photo,
          subscriptions: userSubscriptions,
          followers: followers,
          // Додайте інші дані користувача, які вам потрібні
        };
      })
    );

    // Отримати загальну кількість користувачів, щоб використовувати для пагінації
    const totalCount = await Profile.countDocuments(profileQuery);

    // Поверніть дані клієнту
    res.json({ totalCount: totalCount, items: usersWithSubscriptions });
  } catch (error) {
    console.error("Помилка при отриманні даних:", error);
    res.status(500).json({ message: "Помилка при отриманні даних" });
  }
});


app.listen(port, () => {
  console.log(`Сервер слухає на порту ${port}`);
});
