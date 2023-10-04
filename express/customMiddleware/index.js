import express from 'express';

const app = express();
const PORT = 3000;

const logging = (req, res, next) => {
  console.log(req.method, req.url);

  next();
};

app.use(logging);

app.get('/', (req, res) => {
  res.send('Hello');
});

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
