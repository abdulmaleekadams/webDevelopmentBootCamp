import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';

const app = express();
const port = 3000;

const client = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'permalist',
  password: '@Atanda_19/98$',
  port: 5432,
});

client.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


async function getAllTodoItems() {
  try {
    const results = await client.query('SELECT * FROM items');

    let items = [];

    items = results.rows.map((item) => item);

    return items;
  } catch (err) {
    console.error(`An error ocurred; ${err}`);
  }
}

async function addNewItem(itemToAdd) {
  try {
    await client.query('INSERT INTO items (title) values ($1)', [itemToAdd]);
  } catch (err) {
    console.error(`An error ocurred; ${err}`);
  }
}

async function deleteItem(id) {
  try {
    await client.query('DELETE FROM items WHERE id = $1', [id]);
  } catch (err) {
    console.error(`An error ocurred; ${err}`);
  }
}

async function updateTitle(newTitle, todoItemId) {
  try {
    await client.query('UPDATE items SET title = $1 WHERE id = $2', [newTitle, todoItemId])
  } catch (err) {
    console.error(`An error ocurred; ${err}`);
  }
}

app.get('/', async (req, res) => {
  const todos = await getAllTodoItems();
  res.render('index.ejs', {
    listTitle: 'Today',
    listItems: todos,
  });
});

app.post('/add', async (req, res) => {
  const item = req.body.newItem.trim();
  if (item !== '') {
    await addNewItem(item);
    res.redirect('/');
  } else {
    res.redirect('/')
}
});

app.post('/edit', async (req, res) => {
  const { updatedItemId, updatedItemTitle } = req.body
  if (updatedItemId && updatedItemTitle !== '') {
    await updateTitle(updatedItemTitle, updatedItemId)
  } else if (updatedItemTitle === '') {
    await deleteItem(updatedItemId)
  }
  res.redirect('/')
});

app.post('/delete', async (req, res) => {
  const { deleteItemId} = req.body;
  await deleteItem(deleteItemId)
  res.redirect('/')
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
