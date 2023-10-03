//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

import express from 'express';
import bodyParser from 'body-parser';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { log } from 'console';
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

const PORT = 3000;
const password = 'ILoveProgramming';

app.use(bodyParser.urlencoded({ extended: true }));

let isAuthotize = false;

const checkPassword = (req, res, next) => {
  if (req.body.password === password) {
    isAuthotize = true;
  }
  next();
};

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.use(checkPassword);

app.post('/check', (req, res) => {
  if (isAuthotize) {
    res.sendFile(__dirname + '/public/secret.html');
  } else {
    res.redirect('/');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
