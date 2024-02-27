const express = require("express");
const router = express.Router();

const Subscription = require("../Schema/subscription");
const User = require("../Schema/user");
const Profile = require("../Schema/profileSchema");
const PrivateChat = require("../Schema/PrivateChat");

const verifyTokenAndUser = require("../Security/SecurityUser");

router.post("/subscribe", verifyTokenAndUser, async (req, res) => {
  const followerId = req.userData.userId;
  const followingId = req.body.followingId;

  try {
    const follower = await User.findOne({ userId: followerId });
    const following = await User.findOne({ userId: followingId });
    if (!follower || !following) {
      return res.status(404).json({ message: "Користувач не знайдено" });
    }

    const existingSubscription = await Subscription.findOne({
      follower: followerId,
      following: followingId,
    });

    if (existingSubscription) {
      await Subscription.deleteOne({ _id: existingSubscription._id });
      return res.json({
        message: "Ви успішно відписалися від цього користувача",
        subscription: "No",
      });
    }

    const newSubscription = new Subscription({
      follower: followerId,
      following: followingId,
    });
    await newSubscription.save();

    res.status(201).json({
      message: "Підписка успішно додана",
      subscription: newSubscription,
    });
  } catch (error) {
    console.error("Помилка при додаванні/видаленні підписки:", error);
    res
      .status(500)
      .json({ message: "Помилка при додаванні/видаленні підписки" });
  }
});

router.get("/subscriptions", verifyTokenAndUser, async (req, res) => {
  try {
    const userId = req.userData.userId;

    const subscriptions = await Subscription.find({ follower: userId });
    const followedUserIds = subscriptions.map(
      (subscription) => subscription.following
    );

    const privateChats = await PrivateChat.find({ participants: userId });
    const chatUserIds = privateChats.map((chat) => chat.participants).flat();

    const filteredSubscriptions = followedUserIds.filter(
      (userId) => !chatUserIds.includes(userId)
    );

    const usersInfo = await Profile.find({
      userId: { $in: filteredSubscriptions },
    });
    res.json(usersInfo);
  } catch (error) {
    console.error("Помилка при получені данних:", error);
    res.status(500).json({ message: "Помилка при получені данних" });
  }
});

module.exports = router;
