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
async function getBooksReadWithoutImage() {
  try {
    const results = await client.query('SELECT * FROM books;');
    let books = results.rows;

    return books;
  } catch (err) {
    console.error(err);
  }
}

async function getBooksReadByFilter(filterOption) {
  filterOption = filterOption.split(' ').join('_').toLowerCase();
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

app.get('/admin', async (req, res) => {
  const books = await getBooksReadWithoutImage();
  res.render('admin.ejs', { books: books });
});

app.post('/update/:id', async (req, res) => {
  const id = req.params.id;
  const updatedBookDetails = req.body;
  await updateBook(updatedBookDetails, id);
  res.redirect('/admin');
});

app.post('/delete/:id', async (req, res) => {
  const id = req.params.id;
  await deleteBook(id);
  res.redirect('/admin');
});

async function updateBook(updatedBookDetails, id) {
  const {
    title,
    isbn,
    author,
    date_read,
    rating,
    description,
    book_source,
    book_source_url,
  } = updatedBookDetails;
  const results = await client.query(
    'UPDATE books SET title = $1, isbn = $2, author = $3, date_read = $4, rating = $5, description = $6, book_source = $7, book_source_url = $8 WHERE id = $9',
    [
      title,
      isbn,
      author,
      date_read,
      rating,
      description,
      book_source,
      book_source_url,
      id,
    ]
  );
}
async function deleteBook(id) {
  await client.query('DELETE FROM notes WHERE book_id = $1', [id]);
  await client.query('DELETE FROM books WHERE id = $1', [id]);
}

app.listen(3000, () => {
  console.log(`Server running on http://localhost:3000`);
});
