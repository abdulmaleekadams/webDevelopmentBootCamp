import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';

const app = express();
const port = 3000;

const client = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'world',
  password: '<PostgresSQL set on installation>',
  port: 5432,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

client.connect();

async function checkVisitedCountries() {
  try {
    const visitedCountries = await client.query(
      'SELECT country_code FROM visited_countries;'
    );
    let visited_countries = [];
    visited_countries = visitedCountries.rows.map(
      (country) => country.country_code
    );
    return visited_countries;
  } catch (err) {
    console.error('Error executing query:', err);
  }
}

app.get('/', async (req, res) => {
  const visited_countries = await checkVisitedCountries();

  res.render('index.ejs', {
    countries: visited_countries,
    total: visited_countries.length,
  });
});

async function checkCountryToAdd(input) {
  try {
    const checkCountryNameInDB = await client.query(
      "SELECT country_code from countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input]
    );
    let country = [];
    country = checkCountryNameInDB.rows;
    return country[0].country_code;
  } catch (err) {
    console.error('Error executing query:', err);
  }
}

async function addCountry(countryToAdd) {
  try {
    const addCountryToDB = await client.query(
      'INSERT INTO visited_countries (country_code) VALUES ($1)',
      [countryToAdd]
    );
    return addCountryToDB;
  } catch (err) {
    console.error('Error executing query:', err);
    return err.code;
  }
}

app.post('/add', async (req, res) => {
  const input = req.body.country.toLowerCase();
  const countryCode = await checkCountryToAdd(input);

  if (countryCode !== undefined) {
    const addCountryStatus = await addCountry(countryCode);
    if (addCountryStatus !== '23505') {
      res.redirect('/');
    } else {
      const visited_countries = await checkVisitedCountries();
      res.render('index.ejs', {
        error: 'You have visited this country',
        countries: visited_countries,
        total: visited_countries.length,
      });
    }
  } else {
    const visited_countries = await checkVisitedCountries();

    res.render('index.ejs', {
      error: 'Country not found',
      countries: visited_countries,
      total: visited_countries.length,
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
