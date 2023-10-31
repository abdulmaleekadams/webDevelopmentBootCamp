//jshint esversion:6
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./model');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Function to connect to monogoDB
async function connectDB() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/userDB');
    console.log('Databae Connected');
  } catch (err) {
    console.error('An error occurred, ', err);
  }
}

connectDB();

app.get('/', (req, res) => {
  res.render('home.ejs');
});

app.get('/login', (req, res) => {
  res.render('login.ejs');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.get('/secrets', (req, res) => {
  res.render('secrets');
});

app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = new User({ email: username, password: password });
    await newUser.save();
    res.render('secrets');
  } catch (err) {
    console.error(`An error occurred, ${err}`);
  }
});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ email: username });

    if (user && password === user.password) {
      return res.redirect('/secrets');
    } else if (user && password !== user.password) {
      console.log('Wrong password');
      return res.json({ error: 'Wrong password' });
    } else {
      console.log('User not found');
      return res.json({ error: 'User not found' });
    }
  } catch (err) {
    console.error(`An error occurred, ${err}`);
  }
});

app.listen(PORT, () => {
  console.log(`Server is active on http://localhost:${PORT}`);
});
