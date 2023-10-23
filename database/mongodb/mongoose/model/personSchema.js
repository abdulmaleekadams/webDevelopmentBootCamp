const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit: {
    type: mongoose.Types.ObjectId,
    ref: 'Fruit'
  }
});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;
