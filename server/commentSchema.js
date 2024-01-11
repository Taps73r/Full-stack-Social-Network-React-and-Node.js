const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  commentText: {
    type: String,
    required: true,
  },
  // Додайте інші поля, які вам потрібні для коментарів
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
