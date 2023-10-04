import express from 'express';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  let advice = dayOfTheWeek();
  res.render('index', { advice: advice });
});

function dayOfTheWeek() {
  const day = new Date().getDay();
  if (day === 0 || day === 6) {
    return "Hey! It's the weekend, it's time to have fun!";
  } else {
    return "Hey! It's the weekday, it's time to work hard!";
  }
}

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
