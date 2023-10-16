// HINTS:
// 1. Import express and axios
import express from 'express';
import axios from 'axios';

// 2. Create an express app and set the port number.
const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

// 3. Use the public folder for static files.
app.use(express.static('public'));

// 4. When the user goes to the home page it should render the index.ejs file.
// 5. Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.
app.get('/', async (req, res) => {
  try {
    const response = await axios.get(
      'https://secrets-api.appbrewery.com/random'
    );

    const { secret, username } = response.data;
    res.render('index.ejs', { secret: secret, user: username });
  } catch (error) {
    console.log(error.response.data);
    res.status(500);
  }
});

// 6. Listen on your predefined port and start the server.
app.listen(PORT, () => {
  console.log(`Sever is running on http://localhost:${PORT}`);
});
