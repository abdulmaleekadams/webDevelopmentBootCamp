const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/bmiCalculator.html');
});

app.post('/', (req, res) => {
  const { height, weight } = req.body;
  const bmi = Number(weight) / Number(height) ** 2;
  res.send(`<h1>Your BMI is ${bmi.toFixed(2)}</h1>`);
});

app.listen(3000, () => {
  console.log('Server listenong to PORT 3000');
});
