const express = require('express');
const bodyParser = require('body-parser');
const Todo = require('./model');
require('./config/dbConnect');

const app = express();
const PORT = process.env.PORT || 3000;
// const date = new Date().toDateString().split(' ');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

// const todoListItems = async () => {
//   await Todo.insertMany([
//     {
//       todoTask: 'Learn nodejs',
//     },
//     {
//       todoTask: 'Build a random JS project',
//     },
//     {
//       todoTask: 'Contribute to open source projects',
//     },
//   ]);
// };

// todoListItems();

// Todo.collection.drop()

app.get('/', async (req, res) => {
  const todoList = await Todo.find();

  let todoListData = {
    todoList: todoList,
    action: '/',
    date: 'Today',
  };
  res.render('index.ejs', todoListData);
});

app.post('/', async (req, res) => {
  try {
    await Todo.create({
      todoTask: req.body.todo,
    });
    res.redirect('/');
  } catch (error) {
    return res.json({ message: error.message });
  }
});

app.get('/work', (req, res) => {
  res.render('index.ejs', workTodoListData);
});

app.post('/work', (req, res) => {
  if (req.body.todo.trim() !== '') {
    workTodoListData.todoList.push(req.body.todo);
    res.redirect('/work');
  } else {
    res.redirect('/work');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
