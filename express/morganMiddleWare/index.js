import express from 'express';
import morgan from 'morgan';

const app = express();
app.use(morgan('tiny'));

app.get('/', (req, res) => {
  res.send('HWelcome Home');
});

app.listen(3000, () => {
  console.log('Server running on PORT 3000');
});
