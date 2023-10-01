const { log } = require('console');
const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
  const query = req.body.cityName,
    appId = '3b941b94bbf566621a8bd429f62d33e1',
    unit = 'metric';
  url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=${unit}&appid=${appId}`;
  https.get(url, (response) => {
    response.on('data', (data) => {
      const weatherData = JSON.parse(data);

      const { main, weather, name } = weatherData;
      console.log(main.temp);

      res.write(
        `<h1>The temperature in ${name} is ${main.temp}<sup>o</sup>C</h1>`
      );
      res.write(`<p>The weather is ${weather[0].description}.</p>`);
      res.write(
        `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="waether icon" />`
      );
      res.send();
    });
  });
});

app.listen(3000, () => {
  console.log('Server is running on PORT 3000');
});
