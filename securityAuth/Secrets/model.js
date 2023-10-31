require('dotenv').config();
const mongoose = require('mongoose');
const encrypt = require('mongoose-encryption');

// Create a user schema
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});


// var secret = process.env.SOME_LONG_UNGUESSABLE_STRING;
userSchema.plugin(encrypt, {
  secret: process.env.SECRET,
  encryptedFields: ['password'],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
 