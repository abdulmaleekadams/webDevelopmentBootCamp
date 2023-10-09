import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3000;
const date = new Date().toDateString().split(' ');

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

let todoListData = {
  todoList: [],
  action: '/',
  date: date,
};
let workTodoListData = {
  todoList: [],
  action: '/work',
  date: date,
};

app.get('/', (req, res) => {
  res.render('index.ejs', todoListData);
});

app.post('/', (req, res) => {
  if (req.body.todo.trim() !== '') {
    todoListData.todoList.push(req.body.todo);
    res.redirect('/');
  } else {
    res.redirect('/');
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
