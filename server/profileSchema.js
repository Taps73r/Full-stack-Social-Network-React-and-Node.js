const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  userId: { type: Number, unique: true },
  name: { type: String },
  bio: { type: String },
  photo: { type: String },
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
