const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;

const Profile = require("../Schema/profileSchema");
const Post = require("../Schema/post");
const Subscription = require("../Schema/subscription");

const verifyToken = require("../Security/SecurityToken");

const LIMIT_PER_PAGE = 10;

router.get("/profile/:userId", verifyToken, async (req, res) => {
  const userId = req.params.userId;

  try {
    const profile = await Profile.findOne({ userId });

    if (!profile) {
      return res.status(404).json({ message: "Профіль не знайдено" });
    }

    const subscriptions = await Subscription.find({
      $or: [{ follower: userId }, { following: userId }],
    });

    const userSubscriptions = subscriptions
      .filter((subscription) => subscription.follower.toString() === userId)
      .map((subscription) => subscription.following);

    const followers = subscriptions
      .filter((subscription) => subscription.following.toString() === userId)
      .map((subscription) => subscription.follower);

    res.json({
      userId: profile.userId,
      name: profile.name,
      bio: profile.bio,
      photo: profile.photo,
      subscriptions: userSubscriptions,
      followers: followers,
    });
  } catch (error) {
    console.error("Помилка при отриманні даних профілю:", error);
    res.status(500).json({ message: "Помилка при отриманні даних профілю" });
  }
});

router.get("/profile/:userId/posts", verifyToken, async (req, res) => {
  const userId = req.params.userId;
  const page = parseInt(req.query.page) || 1;

  try {
    const postsCount = await Post.countDocuments({ userId });
    const totalPages = Math.ceil(postsCount / LIMIT_PER_PAGE);
    const skip = (totalPages - page) * LIMIT_PER_PAGE;

    const posts = await Post.find({ userId })
      .skip(skip)
      .limit(LIMIT_PER_PAGE)
      .sort({ createdAt: -1 });

    res.json({
      posts: posts || [],
      currentPage: page,
      totalPages: totalPages,
    });
  } catch (error) {
    console.error("Помилка при отриманні постів користувача:", error);
    res
      .status(500)
      .json({ message: "Помилка при отриманні постів користувача" });
  }
});

router.put("/update-profile", verifyToken, async (req, res) => {
  const userId = req.userId;
  const { name, bio, photo } = req.body;
  try {
    const userProfile = await Profile.findOne({ userId });

    if (!userProfile) {
      return res
        .status(404)
        .json({ message: "Профіль користувача не знайдено" });
    }
    if (name && name.length > 12) {
      return res
        .status(400)
        .json({ message: "Ім'я не може бути довшим за 12 символів" });
    }

    if (bio && bio.length > 50) {
      return res
        .status(400)
        .json({ message: "Біо не може бути довшим за 50 символів" });
    }
    if (name) {
      userProfile.name = name;
    }
    if (bio) {
      userProfile.bio = bio;
    }

    if (photo) {
      const result = await cloudinary.uploader.upload(photo, {
        folder: "profile-photos",
        public_id: `user_${userId}_${Date.now()}`,
      });
      userProfile.photo = result.secure_url;
    }

    await userProfile.save();

    const posts = await Post.find({ userId });

    res.json({
      userId: userProfile.userId,
      name: userProfile.name,
      bio: userProfile.bio,
      photo: userProfile.photo,
      posts: posts || [],
    });
  } catch (error) {
    console.error("Помилка при оновленні профілю:", error);
    res.status(500).json({ message: "Помилка при оновленні профілю" });
  }
});
module.exports = router;
