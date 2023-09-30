const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('<h1>Hello</h1>Hello');
  console.log(req.body());
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
