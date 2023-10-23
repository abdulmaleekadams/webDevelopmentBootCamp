const express = require('express');
const Fruit = require('../model/fruitSchema');
const bodyParser = require('body-parser');
const Person = require('../model/personSchema');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const ratingText = (rating) => {
  if (rating <= 0) {
    return 'Poor';
  } else if (rating < 3) {
    return 'Good';
  } else if (rating <= 5) {
    return 'Better';
  } else if (rating > 5) {
    return 'Excellent';
  } else {
    return 'Great';
  }
};

// routes
app.get('/', (req, res) => {
  res.json('Welcome');
  console.log(ratingText(5));
});

app.get('/fruits', async (req, res) => {
  const fruitsCollection = await Fruit.find();
  res.json({ fruits: fruitsCollection });
});

app.get('/people', async (req, res) => {
  const personsCollection = await Person.find();
  res.json({ people: personsCollection });
});

app.post('/fruits', async (req, res) => {
  let { name, rating, review } = req.query;
  try {
    if ((name.trim() === '') | (rating.trim === '')) {
      return res.json("Name or rating can't be empty");
    }

    if (review.trim() === '') {
      review = ratingText(Number(rating));
    }

    if (await Fruit.findOne({ name })) {
      return res.json('Fruit exists');
    }

    const fruit = await Fruit.create({
      name,
      rating,
      review,
    });

    res.json({ message: fruit });
  } catch (error) {
    res.json({
      status: 'failed',
      error: error.message,
    });
  }
});

app.post('/person', async (req, res) => {
  let { name, age, fruit } = req.query;
  try {
    if ((name.trim() === '') | (age.trim === '')) {
      return res.json("Name or age can't be empty");
    }

    if (await Person.findOne({ name })) {
      return res.json('Person exists');
    }

    let fruitExist = await Fruit.findOne(
      { name: new RegExp(fruit, 'i') },
    );
    if (!fruitExist) {
      fruitExist = await Fruit.create({
        name: fruit,
        rating: 5,
        review: 'My best fruit',
      });
    }

    console.log(fruitExist);

    const person = await Person.create({
      name,
      age,
      favouriteFruit: fruitExist,
    });

    res.json({ message: person });
  } catch (error) {
    console.log(error);
    res.json({
      status: 'failed',
      error: error.message,
    });
  }
});

module.exports = app;
