const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  userId: {
    type: Number,
    ref: 'User', // Посилання на модель User
    required: true,
  },
  postMessage: {
    type: String,
    required: true,
  },
  // Додайте інші поля, які вам потрібні для поста
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;