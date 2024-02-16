const express = require("express");
const router = express.Router();
const Profile = require("../Schema/profile");
const Subscription = require("../Schema/subscription");

const verifyToken = require("../Security/SecurityToken");

router.get("/users-info", verifyToken, async (req, res) => {
  try {
    const { term, page = 1, count = 6 } = req.query;
    let profileQuery = {};

    if (term) {
      profileQuery = { name: { $regex: new RegExp(term), $options: "i" } };
    }

    const skip = (page - 1) * count;
    const allProfiles = await Profile.find(profileQuery)
      .skip(skip)
      .limit(parseInt(count));

    const subscriptions = await Subscription.find();

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
        };
      })
    );

    const totalCount = await Profile.countDocuments(profileQuery);

    res.json({ totalCount: totalCount, items: usersWithSubscriptions });
  } catch (error) {
    console.error("Помилка при отриманні даних:", error);
    res.status(500).json({ message: "Помилка при отриманні даних" });
  }
});

module.exports = router;
