import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';
import axios from 'axios';

const app = express();

const client = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'bookNotes',
  password: '',
  port: '5432',
});

client.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

async function getBookCover(isbn) {
  const url = `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;

  try {
    const response = await axios.get(url);
    const coverURL = response.request.res.responseUrl;

    return coverURL;
  } catch (error) {
    console.error('Error fetching book cover:', error);
  }

  const imgUrl = response.data;
  return imgUrl;
}

async function getBooksRead() {
  try {
    const results = await client.query('SELECT * FROM books;');
    let books = results.rows;

    books = await Promise.all(
      books.map(async (book) => {
        const cover_img = await getBookCover(book.isbn);
        return { ...book, cover_img }; // Update the book object with the cover_img property
      })
    );
    return books;
  } catch (err) {
    console.error(err);
  }
}

async function getBooksReadByFilter(filterOption) {
  try {
    if (['title', 'rating', 'date_read'].includes(filterOption)) {
      const query =
        filterOption === 'title'
          ? `SELECT * FROM public.books ORDER BY ${filterOption} ASC;`
          : `SELECT * FROM public.books ORDER BY ${filterOption} DESC;`;

      const results = await client.query(query);

      let books = results.rows;

      books = await Promise.all(
        books.map(async (book) => {
          const cover_img = await getBookCover(book.isbn);
          return { ...book, cover_img }; // Update the book object with the cover_img property
        })
      );
      return books;
    }
  } catch (err) {
    console.error(err);
  }
}

async function getBook(id) {
  try {
    const results = await client.query(
      'SELECT * from books JOIN notes ON notes.book_id = books.id WHERE books.id = $1',
      [id]
    );

    let book = results.rows[0];
    const cover_img = await getBookCover(book.isbn);
    book = { ...book, cover_img };
    return book;
  } catch (err) {
    console.error(err);
  }
}

app.get('/', async (req, res) => {
  const booksRead = await getBooksRead();
  res.render('index.ejs', { booksRead: booksRead });
});

app.get('/book', (req, res) => {
  console.log(req.query);
  res.render('index.ejs');
});

app.get('/books/:bookId', async (req, res) => {
  const { bookId } = req.params;
  const book = await getBook(bookId);
  // console.log(book[0]);
  res.render('book.ejs', { book: book });
});

app.get('/sort', async (req, res) => {
  const filterOption = req.query.filter;

  const booksRead = await getBooksReadByFilter(filterOption);

  res.render('index.ejs', { booksRead: booksRead });
});

app.listen(3000, () => {
  console.log(`Server running on http://localhost:3000`);
});
