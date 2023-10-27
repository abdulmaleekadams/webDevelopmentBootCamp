import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';

const app = express();
const port = 3000;

const db = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'world',
  password: '',
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let currentUserId = 1;

let users = [
  { id: 1, name: 'Angela', color: 'teal' },
  { id: 2, name: 'Jack', color: 'powderblue' },
];

async function checkVisisted() {
  const result = await db.query(
    'SELECT country_code from visited_countries join family on family.id = family_id where family.id = $1',
    [currentUserId]
  );
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

async function getCurrentUser() {
  const result = await db.query('SELECT * FROM family WHERE id = $1', [
    currentUserId,
  ]);

  return result.rows[0];
}

async function getFamilyMember() {
  const result = await db.query('SELECT * FROM family');

  let familyMembers = [];
  familyMembers = result.rows.map((member) => member);

  return familyMembers;
}

app.get('/', async (req, res) => {
  const countries = await checkVisisted();
  const users = await getFamilyMember();
  res.render('index.ejs', {
    countries: countries,
    total: countries.length,
    users: users,
    color: 'teal',
  });
});

app.post('/add', async (req, res) => {
  const input = req.body['country'];

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    console.log(currentUserId);

    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await db.query(
        'INSERT INTO visited_countries (family_id, country_code) VALUES ($1, $2)',
        [currentUserId, countryCode]
      );
      res.redirect(`/${currentUserId}`);
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});

app.post('/user', async (req, res) => {
  const { user } = req.body;
  if (user === undefined) {
    res.render('new.ejs');
  } else {
    currentUserId = user;
    res.redirect(`/${currentUserId}`);
  }
});

app.post('/new', async (req, res) => {
  const { name, color } = req.body;

  const result = await db.query(
    'INSERT INTO family (name, color) VALUES ($1, $2) RETURNING id',
    [name, color]
  );

  res.redirect(`/${result.rows[0].id}`);

  // db.query()
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html
});

app.get('/:user', async (req, res) => {
  currentUserId = req.params.user;
  const { color } = await getCurrentUser();
  const countries = await checkVisisted();
  const users = await getFamilyMember();
  res.render('index.ejs', {
    countries: countries,
    total: countries.length,
    users: users,
    color: color,
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
