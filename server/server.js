const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/auth_demo';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Помилка підключення до MongoDB:'));
db.once('open', function() {
  console.log('Підключено до бази даних MongoDB');
});

// Імпортуємо модель користувача
const User = require('./user');

app.use(bodyParser.json());

// Реєстрація користувача
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Перевірка чи користувач вже існує
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: 'Користувач з таким ім\'ям вже існує' });
  }

  // Створення нового користувача
  const newUser = new User({ username, password });

  // Збереження користувача в базі даних
  newUser.save((err) => {
    if (err) {
      return res.status(500).json({ message: 'Помилка реєстрації' });
    }
    res.status(201).json({ message: 'Користувач успішно зареєстрований' });
  });
});

app.get('/protected', (req, res) => {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ message: 'Немає токену' });
    }
  
    jwt.verify(token, 'secret_key', (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Невалідний токен' });
      }
  
      // Ви можете використовувати дані користувача, отримані з токену, для доступу
      res.json({ message: 'Доступ дозволено', user: decoded.username });
    });
  });

// Вхід користувача
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Знаходження користувача за ім'ям
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(401).json({ message: 'Користувача з таким ім\'ям не існує' });
  }

  // Порівняння введеного паролю з хешованим паролем в базі даних
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({ message: 'Неправильний пароль' });
  }

  // Генерація JWT для користувача
  const token = jwt.sign({ username }, 'secret_key', { expiresIn: '1h' });

  res.json({ token });
});

app.listen(port, () => {
  console.log(`Сервер слухає на порту ${port}`);
});