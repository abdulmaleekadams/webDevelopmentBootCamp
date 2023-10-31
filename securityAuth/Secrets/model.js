const mongoose= require("mongoose");


// Create a user schema
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);


module.exports = User