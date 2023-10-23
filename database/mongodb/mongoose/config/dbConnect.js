const mongoose = require('mongoose');

const dbConnect = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/fruitDB');
    console.log('Database Connected');
  } catch (error) {
    console.error('Error occured connecting to database, \n', error);
  }
}; 

dbConnect()
