const { default: mongoose } = require('mongoose');

const todoListSchema = new mongoose.Schema({
  todoTask: { type: String, required: true },
});

const Todo = mongoose.model('Todo', todoListSchema);

module.exports = Todo;
