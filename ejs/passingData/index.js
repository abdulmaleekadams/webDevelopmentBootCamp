import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.post('/submit', (req, res) => {
  const nameLength = req.body.fName.length + req.body.lName.length;

  res.render('index.ejs', { nameLength: nameLength });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});