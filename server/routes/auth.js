const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Schema/user");
const Profile = require("../Schema/profileSchema");

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Користувач з таким ім'ям вже існує" });
    }

    const newUser = new User({
      username,
      password,
    });

    await newUser.save();

    const newProfile = new Profile({
      userId: newUser.userId,
      name: username,
    });

    await newProfile.save();

    res.status(201).json({ message: "Користувач успішно зареєстрований" });
  } catch (error) {
    console.error("Помилка реєстрації:", error);
    res.status(500).json({ message: "Помилка реєстрації" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    return res
      .status(401)
      .json({ message: "Користувача з таким ім'ям не існує" });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({ message: "Неправильний пароль" });
  }

  const token = jwt.sign(
    { username, userId: user.userId, bio: user.bio, photo: user.photo },
    "secret_key",
    { expiresIn: "1h" }
  );

  res.json({
    token,
    username,
    userId: user.userId,
    bio: user.bio,
    photo: user.photo,
  });
});
module.exports = router;
