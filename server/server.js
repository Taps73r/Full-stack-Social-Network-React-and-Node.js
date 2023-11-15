const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
const cors = require('cors');
const port = 3002;

const mongoURI = "mongodb+srv://taps73r:motherboard2005@cluster0.rx59bw7.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Помилка підключення до MongoDB:'));
db.once('open', function() {
  console.log('Підключено до бази даних MongoDB');
});
app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
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
  try {
    await newUser.save();
    res.status(201).json({ message: 'Користувач успішно зареєстрований' });
  } catch (error) {
    res.status(500).json({ message: 'Помилка реєстрації' });
  }
});

app.post('/protected', (req, res) => {
    const token = req.body.token;

    if (!token) {
      return res.status(401).json(console.log('Немає токену'));
    }
  
    jwt.verify(token, 'secret_key', (err, decoded) => {
      if (err) {
        console.error('JWT verification error:', err);
        return res.status(401).json(console.log('Немає токену'));
      }
      
      res.json({ message: 'Доступ дозволено', username: decoded.username, userId: decoded.userId, token });
    });
  });

  app.get('/profile/:userId', async (req, res) => {
    const userId = req.params.userId;
  
    try {
      // Знайдіть користувача за userId
      const user = await User.findOne({ userId });
  
      if (!user) {
        return res.status(404).json({ message: 'Користувача не знайдено' });
      }
  
      // Поверніть дані про користувача
      res.json({
        username: user.username,
        userId: user.userId,
        // Додайте інші дані користувача, які вам потрібні
      });
    } catch (error) {
      console.error('Помилка при отриманні даних профілю:', error);
      res.status(500).json({ message: 'Помилка при отриманні даних профілю' });
    }
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

  // Генерація JWT для користувача, включаючи userId
  const token = jwt.sign({ username, userId: user.userId }, 'secret_key', { expiresIn: '1h' });

  res.json({ token, username, userId: user.userId });
});


app.listen(port, () => {
  console.log(`Сервер слухає на порту ${port}`);
});