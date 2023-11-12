const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

userSchema.pre('save', async function(next) {
  const user = this;
  if (!user.isModified('password')) return next();

  const saltRounds = 10;
  user.password = await bcrypt.hash(user.password, saltRounds);
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;