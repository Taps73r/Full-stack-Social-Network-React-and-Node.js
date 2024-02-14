const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const Post = require("../Schema/post");
const User = require("../Schema/user");
const Profile = require("../Schema/profileSchema");
const Comment = require("../Schema/commentSchema");

const verifyTokenAndUser = require("../Security/Security");

router.get("/comments/:postId", async (req, res) => {
  const postId = req.params.postId;

  try {
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Невірний формат ID посту" });
    }

    const comments = await Comment.find({ postId });

    const populatedComments = await Promise.all(
      comments.map(async (comment) => {
        const user = await Profile.findOne({ userId: comment.userId });
        return {
          comment,
          user: { name: user.name, photo: user.photo },
        };
      })
    );

    res.json({ comments: populatedComments, count: populatedComments.length });
  } catch (error) {
    console.error("Помилка при отриманні коментарів:", error);
    res.status(500).json({ message: "Помилка при отриманні коментарів" });
  }
});

router.get("/comments/:postId/count", async (req, res) => {
  const postId = req.params.postId;

  try {
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Невірний формат ID посту" });
    }

    const count = await Comment.countDocuments({ postId });

    res.json({ count });
  } catch (error) {
    console.error("Помилка при отриманні кількості коментарів:", error);
    res
      .status(500)
      .json({ message: "Помилка при отриманні кількості коментарів" });
  }
});

router.delete("/comments/:commentId", verifyTokenAndUser, async (req, res) => {
  const commentId = req.params.commentId;

  try {
    if (!mongoose.Types.ObjectId.isValid(commentId)) {
      return res.status(400).json({ message: "Невірний формат ID коментаря" });
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Коментар не знайдено" });
    }

    const post = await Post.findById(comment.postId);
    if (!post) {
      return res
        .status(404)
        .json({ message: "Пост, пов'язаний з цим коментарем, не знайдено" });
    }

    if (post.userId !== req.userData.userId) {
      return res
        .status(403)
        .json({ message: "Ви не маєте дозволу на видалення коментаря" });
    }

    await Comment.findByIdAndDelete(commentId);

    res.json({
      message: "Коментар успішно видалено",
    });
  } catch (error) {
    console.error("Помилка при видаленні коментаря:", error);
    res.status(500).json({ message: "Помилка при видаленні коментаря" });
  }
});

router.post("/comments/:postId", async (req, res) => {
  const postId = req.params.postId;
  const { userId, commentText } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Невірний формат ID посту" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Пост не знайдено" });
    }

    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ message: "Користувача не знайдено" });
    }

    const userProfile = await Profile.findOne({ userId });

    const comment = new Comment({
      postId,
      userId,
      commentText,
    });

    await comment.save();
    await post.save();

    res.status(201).json({
      message: "Коментар успішно створено",
      newComment: {
        comment,
        user: { name: userProfile.name, photo: userProfile.photo },
      },
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }

    console.error("Помилка при створенні коментаря:", error);
    res.status(500).json({ message: "Помилка при створенні коментаря" });
  }
});
module.exports = router;
