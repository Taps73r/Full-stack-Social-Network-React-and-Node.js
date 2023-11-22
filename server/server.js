const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const port = 3002;

const Post = require('./post');
const User = require('./user');
const Subscription = require('./subscription');
const Profile = require('./profileSchema');

const mongoURI = "mongodb+srv://taps73r:motherboard2005@cluster0.rx59bw7.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Помилка підключення до MongoDB:'));
db.once('open', function () {
  console.log('Підключено до бази даних MongoDB');
});
app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.use(bodyParser.json());

// Реєстрація користувача
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Перевірка чи користувач вже існує
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Користувач з таким ім\'ям вже існує' });
    }

    // Створення нового користувача
    const newUser = new User({
      username,
      password,
    });

    // Збереження користувача в базі даних
    await newUser.save();

    // Створення профілю для нового користувача
    const newProfile = new Profile({
      userId: newUser.userId,
      name: username,
    });

    // Збереження профілю в базі даних
    await newProfile.save();

    res.status(201).json({ message: 'Користувач успішно зареєстрований' });
  } catch (error) {
    console.error('Помилка реєстрації:', error);
    res.status(500).json({ message: 'Помилка реєстрації' });
  }
});
app.post('/subscribe', async (req, res) => {
  const { followerId, followingId } = req.body;

  try {
    // Перевірка, чи обидва користувачі існують
    const follower = await User.findOne({ userId: followerId });
    const following = await User.findOne({ userId: followingId });

    if (!follower || !following) {
      return res.status(404).json({ message: 'Користувач не знайдено' });
    }

    // Перевірка, чи підписка вже існує
    const existingSubscription = await Subscription.findOne({ follower: followerId, following: followingId });

    if (existingSubscription) {
      // Якщо підписка вже існує, розглядаємо це як відписку
      await Subscription.deleteOne({ _id: existingSubscription._id });
      return res.json({ message: 'Ви успішно відписалися від цього користувача', subscription: null });
    }

    // Створення нової підписки
    const newSubscription = new Subscription({ follower: followerId, following: followingId });
    await newSubscription.save();

    res.status(201).json({ message: 'Підписка успішно додана', subscription: newSubscription });
  } catch (error) {
    console.error('Помилка при додаванні/видаленні підписки:', error);
    res.status(500).json({ message: 'Помилка при додаванні/видаленні підписки' });
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
    // Знайдіть профіль за userId
    const profile = await Profile.findOne({ userId });

    if (!profile) {
      return res.status(404).json({ message: 'Профіль не знайдено' });
    }

    // Знайдіть пости для цього користувача
    const posts = await Post.find({ userId });

    res.json({
      userId: profile.userId,
      name: profile.name,
      bio: profile.bio,
      photo: profile.photo,
      posts: posts || [], // Додайте дані про пости користувача
      // Додайте інші дані профілю, які вам потрібні
    });
  } catch (error) {
    console.error('Помилка при отриманні даних профілю:', error);
    res.status(500).json({ message: 'Помилка при отриманні даних профілю' });
  }
});

app.put('/update-profile/:userId', async (req, res) => {
  const userId = req.params.userId;
  const { name, bio, photo } = req.body;

  try {
    // Знаходимо профіль користувача за userId
    const userProfile = await Profile.findOne({ userId });

    if (!userProfile) {
      return res.status(404).json({ message: 'Профіль користувача не знайдено' });
    }

    // Оновлюємо тільки ті дані, які надійшли з фронтенду та не є пустими
    if (name) {
      userProfile.name = name;
    }
    if (bio) {
      userProfile.bio = bio;
    }
    if (photo) {
      userProfile.photo = photo;
    }

    // Зберігаємо оновлений профіль користувача
    await userProfile.save();

    // Знайдіть пости для цього користувача
    const posts = await Post.find({ userId });

    // Повертаємо оновлений профіль користувача з даними про пости
    res.json({
      userId: userProfile.userId,
      name: userProfile.name,
      bio: userProfile.bio,
      photo: userProfile.photo,
      posts: posts || [], // Додайте дані про пости користувача
      // Додайте інші дані профілю, які вам потрібні
    });
  } catch (error) {
    console.error('Помилка при оновленні профілю:', error);
    res.status(500).json({ message: 'Помилка при оновленні профілю' });
  }
});


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
  const token = jwt.sign({ username, userId: user.userId, bio: user.bio, photo: user.photo }, 'secret_key', { expiresIn: '1h' });

  res.json({ token, username, userId: user.userId, bio: user.bio, photo: user.photo });
});
// /users-info endpoint
app.get('/users-info', async (req, res) => {
  try {
    const { term } = req.query;
    let profileQuery = {};

    if (term) {
      profileQuery = { name: { $regex: new RegExp(term), $options: 'i' } };
    }

    // Отримати всі профайли користувачів з бази даних з можливістю пошуку за іменем
    const allProfiles = await Profile.find(profileQuery);

    // Отримати інформацію про підписки для кожного користувача
    const subscriptions = await Subscription.find();

    // Додати інформацію про підписки та підписників до кожного користувача
    const usersWithSubscriptions = await Promise.all(allProfiles.map(async userProfile => {
      const userSubscriptions = subscriptions
        .filter(subscription => subscription.follower.toString() === userProfile.userId.toString())
        .map(subscription => subscription.following);

      const followers = subscriptions
        .filter(subscription => subscription.following.toString() === userProfile.userId.toString())
        .map(subscription => subscription.follower);

      return {
        userId: userProfile.userId,
        name: userProfile.name,
        bio: userProfile.bio,
        photo: userProfile.photo,
        subscriptions: userSubscriptions,
        followers: followers,
        // Додайте інші дані користувача, які вам потрібні
      };
    }));

    // Поверніть дані клієнту
    res.json({ totalCount: usersWithSubscriptions.length, items: usersWithSubscriptions });
  } catch (error) {
    console.error('Помилка при отриманні даних:', error);
    res.status(500).json({ message: 'Помилка при отриманні даних' });
  }
});


app.post('/posts', async (req, res) => {
  const { userId, postMessage } = req.body;

  try {
    // Створіть новий пост
    const newPost = new Post({
      userId, // Використовуйте інкрементований userId
      postMessage,
      // Додайте інші дані, які вам потрібні для поста
    });

    // Збережіть пост в базу даних
    await newPost.save();

    // Поверніть дані про створений пост
    res.status(201).json({ message: 'Пост успішно створено', newPost });
  } catch (error) {
    console.error('Помилка при створенні поста:', error);
    res.status(500).json({ message: 'Помилка при створенні поста' });
  }
});

app.listen(port, () => {
  console.log(`Сервер слухає на порту ${port}`);
});
