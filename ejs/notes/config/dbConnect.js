const mongoose = require('mongoose');

const dbConnect = async () => {
  try {
    await mongoose.connect(
      'mongodb://127.0.0.1:27017/todolistDB'
    );
    console.log('Todo List DB connected');
  } catch (error) {
    console.log(`Error occured \n ${error}`);
  }
};

dbConnect()
