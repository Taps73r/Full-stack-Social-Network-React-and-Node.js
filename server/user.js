// Змінена схема користувача (user.js)
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userId: { type: Number, unique: true },
  bio: { type: String },
  photo: { type: String }, // Асумпція: URL або шлях до зображення користувача
});

userSchema.pre('save', async function(next) {
  const user = this;

  // Генеруємо унікальний userId, якщо його немає
  if (!user.userId) {
    user.userId = await generateUniqueUserId();
  }

  // Хешуємо пароль тільки тоді, коли він був змінений
  if (user.isModified('password')) {
    const saltRounds = 10;
    user.password = await bcrypt.hash(user.password, saltRounds);
  }

  next();
});

// Додайте функцію для генерації унікального userId
async function generateUniqueUserId() {
  const lastUser = await User.findOne().sort({ userId: -1 });
  return lastUser ? lastUser.userId + 1 : 1;
}

// Додайте функцію для хешування паролю
userSchema.methods.hashPassword = async function(password) {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
