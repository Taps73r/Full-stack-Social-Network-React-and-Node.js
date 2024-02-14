const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;

const Profile = require("../Schema/profileSchema");
const Post = require("../Schema/post");
const Subscription = require("../Schema/subscription");

const verifyToken = require("../Security/SecurityToken");

router.get("/profile/:userId", verifyToken, async (req, res) => {
  const userId = req.params.userId;

  try {
    const profile = await Profile.findOne({ userId });

    if (!profile) {
      return res.status(404).json({ message: "Профіль не знайдено" });
    }

    const posts = await Post.find({ userId });

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
      posts: posts || [],
      subscriptions: userSubscriptions,
      followers: followers,
    });
  } catch (error) {
    console.error("Помилка при отриманні даних профілю:", error);
    res.status(500).json({ message: "Помилка при отриманні даних профілю" });
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
