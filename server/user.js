const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userId: { type: Number, unique: true },
});

userSchema.pre('save', async function(next) {
  const user = this;

  // Генеруємо унікальний userId, якщо його немає
  if (!user.userId) {
    user.userId = await generateUniqueUserId();
  }

  // Хешуємо пароль перед збереженням
  const saltRounds = 10;
  user.password = await bcrypt.hash(user.password, saltRounds);

  next();
});

// Функція для генерації унікального userId
async function generateUniqueUserId() {
  const lastUser = await User.findOne().sort({ userId: -1 });
  return lastUser ? lastUser.userId + 1 : 1;
}

const User = mongoose.model('User', userSchema);

module.exports = User;