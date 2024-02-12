const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const express = require("express");
const router = express.Router();

const Post = require("../Schema/post");
const User = require("../Schema/user");
const Profile = require("../Schema/profileSchema");

const postValidation = require("../Validation/postValidation");

router.post("/posts", async (req, res) => {
  const { userId, postMessage, photos } = req.body;

  const validation = postValidation(postMessage);
  if (!validation.isValid) {
    return res.status(400).json({ message: validation.errorMessage });
  }
  try {
    const newPost = new Post({
      userId,
      postMessage,
      photos,
    });

    await newPost.save();

    const uploadedPhotoUrls = await Promise.all(
      photos.map(async (photo, index) => {
        const result = await cloudinary.uploader.upload(photo, {
          folder: `post_folder/${userId}`,
          public_id: `post_${userId}_${index + 1}_${Date.now()}`,
        });
        return result.secure_url;
      })
    );

    newPost.photos = uploadedPhotoUrls;

    await newPost.save();

    res.status(201).json({ message: "Post successfully created", newPost });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Error creating post" });
  }
});

router.get("/news-post", async (req, res) => {
  try {
    const allPosts = await Post.find();

    if (!allPosts || allPosts.length === 0) {
      return res.status(404).json({ message: "Posts not found" });
    }

    const postsWithUserInfo = await Promise.all(
      allPosts.map(async (post) => {
        const userProfile = await Profile.findOne({ userId: post.userId });
        return {
          _id: post._id,
          postMessage: post.postMessage,
          photos: post.photos,
          userId: {
            userId: userProfile ? userProfile.userId : null,
            name: userProfile ? userProfile.name : null,
            photo: userProfile ? userProfile.photo : null,
          },
          likes: post.likes,
        };
      })
    );

    res.json({ posts: postsWithUserInfo });
  } catch (error) {
    console.error("Error getting posts:", error);
    res.status(500).json({ message: "Error getting posts" });
  }
});

router.delete("/posts/:postId", async (req, res) => {
  const postId = req.params.postId;
  const userId = req.body.userId; // Додали отримання айді користувача з тіла запиту

  try {
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Невірний формат ID посту" });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Пост не знайдено" });
    }

    // Перевірка чи айді користувача співпадає з айді поста
    if (post.userId !== userId) {
      return res
        .status(403)
        .json({ message: "Ви не можете видалити цей пост" });
    }

    if (post.photos && post.photos.length > 0) {
      await Promise.all(
        post.photos.map(async (photoUrl) => {
          const publicId = photoUrl.split("/").pop().split(".")[0];
          await cloudinary.uploader.destroy(publicId);
        })
      );
    }

    await Post.findByIdAndDelete(postId);

    const userPosts = await Post.find({ userId });

    res.json({
      message: "Пост успішно видалено",
      posts: userPosts || [],
    });
  } catch (error) {
    console.error("Помилка при видаленні посту:", error);
    res.status(500).json({ message: "Помилка при видаленні посту" });
  }
});

router.post("/like", async (req, res) => {
  const { userId, postId } = req.body;

  try {
    const user = await User.findOne({ userId });
    const post = await Post.findById(postId);

    if (!user || !post) {
      return res
        .status(404)
        .json({ message: "Користувач або пост не знайдено" });
    }

    const isLiked = post.likes.includes(userId);
    if (isLiked === true) {
      post.likes.pull(userId);
      await post.save();

      res.json({
        message: "Лайк успішно знято",
        liked: false,
        likeCount: post.likes.length,
      });
    } else {
      post.likes.push(userId);

      await post.save();

      res.json({
        message: "Лайк успішно додано",
        liked: true,
        likeCount: post.likes.length,
      });
    }
  } catch (error) {
    console.error("Помилка при роботі з лайками:", error);
    res.status(500).json({ message: "Помилка при роботі з лайками" });
  }
});

router.put("/posts/:postId", async (req, res) => {
  const postId = req.params.postId;
  const userId = req.body.userId;

  let { updatedText } = req.body;
  updatedText = updatedText || "";

  try {
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Невірний формат ID посту" });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Пост не знайдено" });
    }

    if (post.userId !== userId) {
      return res.status(403).json({ message: "Ви не можете оновити цей пост" });
    }

    const validation = postValidation(updatedText);
    if (!validation.isValid) {
      return res.status(400).json({ message: validation.errorMessage });
    }

    post.postMessage = updatedText;
    await post.save();

    const userPosts = await Post.find({ userId });

    res.json({
      message: "Текст поста успішно оновлено",
      posts: userPosts || [],
    });
  } catch (error) {
    console.error("Помилка при оновленні тексту поста:", error);
    res.status(500).json({ message: "Помилка при оновленні тексту поста" });
  }
});

module.exports = router;
