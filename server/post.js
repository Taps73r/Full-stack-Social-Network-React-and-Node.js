const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  userId: {
    type: Number,
    ref: 'User',
    required: true,
  },
  postMessage: {
    type: String
  },
  photos: [{
    type: String,
    required: true, 
  }],
  // Додайте інші поля, які вам потрібні для поста
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
