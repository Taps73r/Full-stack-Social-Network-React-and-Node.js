const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const express = require("express");
const router = express.Router();

const Post = require("../Schema/post");
const Profile = require("../Schema/profileSchema");

const postValidation = require("../Validation/postValidation");
const verifyTokenAndUser = require("../Security/SecurityUser");

router.post("/posts", verifyTokenAndUser, async (req, res) => {
  const userId = req.userData.userId;
  const { postMessage, photos } = req.body;

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

router.get("/news-post", verifyTokenAndUser, async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const pageSize = parseInt(req.query.pageSize) || 8;

    const totalPosts = await Post.countDocuments();
    const totalPages = Math.ceil(totalPosts / pageSize);

    const skip = (page - 1) * pageSize;

    const allPosts = await Post.find()
      .skip(skip)
      .limit(pageSize)
      .sort({ createdAt: -1 });

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

    res.json({
      posts: postsWithUserInfo,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.error("Error getting posts:", error);
    res.status(500).json({ message: "Error getting posts" });
  }
});

router.delete("/posts/:postId", verifyTokenAndUser, async (req, res) => {
  const postId = req.params.postId;
  const userId = req.userData.userId;

  try {
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Invalid post ID format" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.userId != userId) {
      return res.status(403).json({ message: "You cannot delete this post" });
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
      message: "Post successfully deleted",
      posts: userPosts || [],
    });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Error deleting post" });
  }
});

router.post("/like", verifyTokenAndUser, async (req, res) => {
  const userId = req.userData.userId;
  const { postId } = req.body;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const isLiked = post.likes.includes(userId);
    if (isLiked) {
      post.likes.pull(userId);
      await post.save();

      res.json({
        message: "Like removed successfully",
        liked: false,
        likeCount: post.likes.length,
      });
    } else {
      post.likes.push(userId);
      await post.save();

      res.json({
        message: "Like added successfully",
        liked: true,
        likeCount: post.likes.length,
      });
    }
  } catch (error) {
    console.error("Error handling likes:", error);
    res.status(500).json({ message: "Error handling likes" });
  }
});

router.put("/posts/:postId", verifyTokenAndUser, async (req, res) => {
  const postId = req.params.postId;
  const userId = req.userData.userId;

  let { updatedText } = req.body;
  updatedText = updatedText || "";

  try {
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ message: "Invalid post ID format" });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.userId !== userId) {
      return res
        .status(403)
        .json({ message: "You do not have permission to update this post" });
    }

    const validation = postValidation(updatedText);
    if (!validation.isValid) {
      return res.status(400).json({ message: validation.errorMessage });
    }

    post.postMessage = updatedText;
    await post.save();

    const userPosts = await Post.find({ userId });

    res.json({
      message: "Post text updated successfully",
      posts: userPosts || [],
    });
  } catch (error) {
    console.error("Error updating post text:", error);
    res.status(500).json({ message: "Error updating post text" });
  }
});

module.exports = router;
