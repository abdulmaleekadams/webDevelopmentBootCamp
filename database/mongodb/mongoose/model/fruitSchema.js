const mongoose = require('mongoose');

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is missing'],
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
  },
  review: String,
});

// A model
const Fruit = mongoose.model('Fruit', fruitSchema);

module.exports = Fruit;
