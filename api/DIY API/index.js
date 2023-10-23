import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
const masterKey = '4VGP2DN-6EWM4SJ-N6FGRHV-Z3PR3TT';

app.use(bodyParser.urlencoded({ extended: true }));

//1. GET a random joke
app.get('/random', (req, res) => {
  const randomId = Math.floor(Math.random() * jokes.length);
  const randomJoke = jokes[randomId];

  res.json(randomJoke);
});

//2. GET a specific joke
app.get('/jokes/:id', (req, res) => {
  const jokeId = parseInt(req.params.id);
  const jokeData = jokes.find((joke) => joke.id === jokeId);
  jokeData
    ? res.json(jokeData)
    : res.json({ message: `Joke with ID ${jokeId} is not found` });
});

//3. GET a jokes by filtering on the joke type
app.get('/filter', (req, res) => {
  const jokeTypes = req.query.type;

  const jokeTypeArr = jokeTypes
    .split(',')
    .map((jokeType) => jokeType.toLowerCase().trim());

  const filteredJoke = jokes.filter((joke) =>
    jokeTypeArr.includes(joke.jokeType.toLowerCase())
  );

  filteredJoke.length !== 0
    ? res.json(filteredJoke)
    : res
        .status(404)
        .json({ message: `Joke with type [${jokeTypeArr}] not found` });
});

//4. POST a new joke
app.post('/jokes/', (req, res) => {
  const { joke, type } = req.body;
  if (joke.trim() === '' || joke.trim().length <= 10) {
    res.json({
      message: 'Joke content can be empty or less than 10 character',
    });
  } else {
    const newId = jokes.length + 1;
    type.trim() === '' && (type = 'Neutral');

    const newJoke = {
      id: newId,
      joke: joke,
      type: type,
    };
    jokes.push(newJoke);

    res.json({ message: 'New joke created', ...newJoke });
  }
});

//5. PUT a joke
app.put('/jokes/:id', (req, res) => {
  const jokeId = parseInt(req.params.id);
  let { joke, type } = req.body;
  type.trim() === '' && (type = 'Nuetral');
  let jokeUpdate = {};

  const searchIndex = jokes.findIndex((joke) => joke.id === jokeId);

  if (searchIndex === -1) {
    res.status(404).json({ message: `Message with ${jokeId} doesn't exist` });
  } else {
    if (joke.trim() === '' || joke.trim().length <= 10) {
      res.json({
        message: 'Joke content can be empty or less than 10 character',
      });
    } else {
      jokeUpdate = {
        id: jokeId,
        jokeText: joke,
        jokeType: type,
      };

      jokes[searchIndex] = jokeUpdate;

      res.json({ message: 'Successfully replaced', ...jokes[searchIndex] });
    }
  }
});

//6. PATCH a joke
app.patch('/jokes/:id', (req, res) => {
  const jokeId = parseInt(req.params.id);

  let { joke, type } = req.body;
  const existingJoke = jokes.find((joke) => joke.id === jokeId);

  let jokeUpdate = {
    id: jokeId,
    jokeText: joke || existingJoke.jokeText,
    jokeType: type.trim() === '' ? 'Neutral' : type || existingJoke.jokeType,
  };

  const jokeIndex = jokes.findIndex((joke) => joke.id === jokeId);
  if (searchIndex === -1) {
    res.status(404).json({ message: `Message with ${jokeId} doesn't exist` });
  } else {
    jokes[jokeIndex] = jokeUpdate;

    res.json({ message: 'Successfully edited', ...jokes[jokeIndex] });
  }
});

//7. DELETE Specific joke
app.delete('/jokes/:id', (req, res) => {
  const jokeId = parseInt(req.params.id);

  const searchIndex = jokes.findIndex((joke) => joke.id === jokeId);

  if (searchIndex === -1) {
    res
      .status(404)
      .json({ message: `Message with ID ${jokeId} doesn't exist` });
  } else {
    const jokeToRmv = jokes.splice(searchIndex, 1);

    res.json({ message: 'Successfully Deleted', jokeDeleted: jokeToRmv });
  }
});

//8. DELETE All jokes
app.delete('/all', (req, res) => {
  const queryMasterkey = req.query.masterkey;
  if (queryMasterkey === masterKey) {
    jokes.splice(0);

    res.json({ message: 'Successfully Deleted all jokes' });
  } else {
    res
      .status(401)
      .json({ message: `You are not authorised to perform this action.` });
  }
});

app.listen(port, () => {
  console.log(`Successfully started server on port ${port}.`);
});

var jokes = [
  {
    id: 1,
    jokeText:
      "Why don't scientists trust atoms? Because they make up everything.",
    jokeType: 'Science',
  },
  {
    id: 2,
    jokeText:
      'Why did the scarecrow win an award? Because he was outstanding in his field.',
    jokeType: 'Puns',
  },
  {
    id: 3,
    jokeText:
      'I told my wife she was drawing her eyebrows too high. She looked surprised.',
    jokeType: 'Puns',
  },
  {
    id: 4,
    jokeText:
      'What did one ocean say to the other ocean? Nothing, they just waved.',
    jokeType: 'Wordplay',
  },
  {
    id: 5,
    jokeText:
      'Why do we never tell secrets on a farm? Because the potatoes have eyes and the corn has ears.',
    jokeType: 'Wordplay',
  },
  {
    id: 6,
    jokeText: 'How do you organize a space party? You planet!',
    jokeType: 'Science',
  },
  {
    id: 7,
    jokeText:
      "Why don't some couples go to the gym? Because some relationships don't work out.",
    jokeType: 'Puns',
  },
  {
    id: 8,
    jokeText:
      "Parallel lines have so much in common. It's a shame they'll never meet.",
    jokeType: 'Math',
  },
  {
    id: 9,
    jokeText: 'What do you call fake spaghetti? An impasta!',
    jokeType: 'Food',
  },
  {
    id: 10,
    jokeText: 'Why did the tomato turn red? Because it saw the salad dressing!',
    jokeType: 'Food',
  },
  {
    id: 11,
    jokeText:
      'What do you get when you cross a snowman and a vampire? Frostbite!',
    jokeType: 'Wordplay',
  },
  {
    id: 12,
    jokeText:
      'Why did the golfer bring two pairs of pants? In case he got a hole in one!',
    jokeType: 'Sports',
  },
  {
    id: 13,
    jokeText:
      'Why are ghosts bad at lying? Because you can see right through them!',
    jokeType: 'Wordplay',
  },
  {
    id: 14,
    jokeText: "Why can't you give Elsa a balloon? Because she will let it go.",
    jokeType: 'Movies',
  },
  {
    id: 15,
    jokeText:
      "I'm reading a book about anti-gravity. It's impossible to put down!",
    jokeType: 'Science',
  },
  {
    id: 16,
    jokeText:
      'I told my wife she was drawing her eyebrows too high. She looked surprised.',
    jokeType: 'Puns',
  },
  {
    id: 17,
    jokeText:
      'What did one ocean say to the other ocean? Nothing, they just waved.',
    jokeType: 'Wordplay',
  },
  {
    id: 18,
    jokeText:
      'Why do we never tell secrets on a farm? Because the potatoes have eyes and the corn has ears.',
    jokeType: 'Wordplay',
  },
  {
    id: 19,
    jokeText: 'How do you organize a space party? You planet!',
    jokeType: 'Science',
  },
  {
    id: 20,
    jokeText:
      "Why don't some couples go to the gym? Because some relationships don't work out.",
    jokeType: 'Puns',
  },
  {
    id: 21,
    jokeText:
      "Parallel lines have so much in common. It's a shame they'll never meet.",
    jokeType: 'Math',
  },
  {
    id: 22,
    jokeText: 'What do you call fake spaghetti? An impasta!',
    jokeType: 'Food',
  },
  {
    id: 23,
    jokeText: 'Why did the tomato turn red? Because it saw the salad dressing!',
    jokeType: 'Food',
  },
  {
    id: 24,
    jokeText:
      'What do you get when you cross a snowman and a vampire? Frostbite!',
    jokeType: 'Wordplay',
  },
  {
    id: 25,
    jokeText:
      'Why did the golfer bring two pairs of pants? In case he got a hole in one!',
    jokeType: 'Sports',
  },
  {
    id: 26,
    jokeText:
      'Why are ghosts bad at lying? Because you can see right through them!',
    jokeType: 'Wordplay',
  },
  {
    id: 27,
    jokeText: "Why can't you give Elsa a balloon? Because she will let it go.",
    jokeType: 'Movies',
  },
  {
    id: 28,
    jokeText:
      "I'm reading a book about anti-gravity. It's impossible to put down!",
    jokeType: 'Science',
  },
  {
    id: 29,
    jokeText:
      'I told my wife she was drawing her eyebrows too high. She looked surprised.',
    jokeType: 'Puns',
  },
  {
    id: 30,
    jokeText:
      'What did one ocean say to the other ocean? Nothing, they just waved.',
    jokeType: 'Wordplay',
  },
  {
    id: 31,
    jokeText:
      'Why do we never tell secrets on a farm? Because the potatoes have eyes and the corn has ears.',
    jokeType: 'Wordplay',
  },
  {
    id: 32,
    jokeText: 'How do you organize a space party? You planet!',
    jokeType: 'Science',
  },
  {
    id: 33,
    jokeText:
      "Why don't some couples go to the gym? Because some relationships don't work out.",
    jokeType: 'Puns',
  },
  {
    id: 34,
    jokeText:
      "Parallel lines have so much in common. It's a shame they'll never meet.",
    jokeType: 'Math',
  },
  {
    id: 35,
    jokeText: 'What do you call fake spaghetti? An impasta!',
    jokeType: 'Food',
  },
  {
    id: 36,
    jokeText: 'Why did the tomato turn red? Because it saw the salad dressing!',
    jokeType: 'Food',
  },
  {
    id: 37,
    jokeText:
      'What do you get when you cross a snowman and a vampire? Frostbite!',
    jokeType: 'Wordplay',
  },
  {
    id: 38,
    jokeText:
      'Why did the golfer bring two pairs of pants? In case he got a hole in one!',
    jokeType: 'Sports',
  },
  {
    id: 39,
    jokeText:
      'Why are ghosts bad at lying? Because you can see right through them!',
    jokeType: 'Wordplay',
  },
  {
    id: 40,
    jokeText: "Why can't you give Elsa a balloon? Because she will let it go.",
    jokeType: 'Movies',
  },
  {
    id: 41,
    jokeText:
      "I'm reading a book about anti-gravity. It's impossible to put down!",
    jokeType: 'Science',
  },
  {
    id: 42,
    jokeText:
      'I told my wife she was drawing her eyebrows too high. She looked surprised.',
    jokeType: 'Puns',
  },
  {
    id: 43,
    jokeText:
      'What did one ocean say to the other ocean? Nothing, they just waved.',
    jokeType: 'Wordplay',
  },
  {
    id: 44,
    jokeText:
      'Why do we never tell secrets on a farm? Because the potatoes have eyes and the corn has ears.',
    jokeType: 'Wordplay',
  },
  {
    id: 45,
    jokeText: 'How do you organize a space party? You planet!',
    jokeType: 'Science',
  },
  {
    id: 46,
    jokeText:
      "Why don't some couples go to the gym? Because some relationships don't work out.",
    jokeType: 'Puns',
  },
  {
    id: 47,
    jokeText:
      "Parallel lines have so much in common. It's a shame they'll never meet.",
    jokeType: 'Math',
  },
  {
    id: 48,
    jokeText: 'What do you call fake spaghetti? An impasta!',
    jokeType: 'Food',
  },
  {
    id: 49,
    jokeText: 'Why did the tomato turn red? Because it saw the salad dressing!',
    jokeType: 'Food',
  },
  {
    id: 50,
    jokeText:
      'What do you get when you cross a snowman and a vampire? Frostbite!',
    jokeType: 'Wordplay',
  },
  {
    id: 51,
    jokeText:
      'Why did the golfer bring two pairs of pants? In case he got a hole in one!',
    jokeType: 'Sports',
  },
  {
    id: 52,
    jokeText:
      'Why are ghosts bad at lying? Because you can see right through them!',
    jokeType: 'Wordplay',
  },
  {
    id: 53,
    jokeText: "Why can't you give Elsa a balloon? Because she will let it go.",
    jokeType: 'Movies',
  },
  {
    id: 54,
    jokeText:
      "I'm reading a book about anti-gravity. It's impossible to put down!",
    jokeType: 'Science',
  },
  {
    id: 55,
    jokeText:
      'I told my wife she was drawing her eyebrows too high. She looked surprised.',
    jokeType: 'Puns',
  },
  {
    id: 56,
    jokeText:
      'What did one ocean say to the other ocean? Nothing, they just waved.',
    jokeType: 'Wordplay',
  },
  {
    id: 57,
    jokeText:
      'Why do we never tell secrets on a farm? Because the potatoes have eyes and the corn has ears.',
    jokeType: 'Wordplay',
  },
  {
    id: 58,
    jokeText: 'How do you organize a space party? You planet!',
    jokeType: 'Science',
  },
  {
    id: 59,
    jokeText:
      "Why don't some couples go to the gym? Because some relationships don't work out.",
    jokeType: 'Puns',
  },
  {
    id: 60,
    jokeText:
      "Parallel lines have so much in common. It's a shame they'll never meet.",
    jokeType: 'Math',
  },
  {
    id: 61,
    jokeText: 'What do you call fake spaghetti? An impasta!',
    jokeType: 'Food',
  },
  {
    id: 62,
    jokeText: 'Why did the tomato turn red? Because it saw the salad dressing!',
    jokeType: 'Food',
  },
  {
    id: 63,
    jokeText:
      'What do you get when you cross a snowman and a vampire? Frostbite!',
    jokeType: 'Wordplay',
  },
  {
    id: 64,
    jokeText:
      'Why did the golfer bring two pairs of pants? In case he got a hole in one!',
    jokeType: 'Sports',
  },
  {
    id: 65,
    jokeText:
      'Why are ghosts bad at lying? Because you can see right through them!',
    jokeType: 'Wordplay',
  },
  {
    id: 66,
    jokeText: "Why can't you give Elsa a balloon? Because she will let it go.",
    jokeType: 'Movies',
  },
  {
    id: 67,
    jokeText:
      "I'm reading a book about anti-gravity. It's impossible to put down!",
    jokeType: 'Science',
  },
  {
    id: 68,
    jokeText:
      'I told my wife she was drawing her eyebrows too high. She looked surprised.',
    jokeType: 'Puns',
  },
  {
    id: 69,
    jokeText:
      'What did one ocean say to the other ocean? Nothing, they just waved.',
    jokeType: 'Wordplay',
  },
  {
    id: 70,
    jokeText:
      'Why do we never tell secrets on a farm? Because the potatoes have eyes and the corn has ears.',
    jokeType: 'Wordplay',
  },
  {
    id: 71,
    jokeText: 'How do you organize a space party? You planet!',
    jokeType: 'Science',
  },
  {
    id: 72,
    jokeText:
      "Why don't some couples go to the gym? Because some relationships don't work out.",
    jokeType: 'Puns',
  },
  {
    id: 73,
    jokeText:
      "Parallel lines have so much in common. It's a shame they'll never meet.",
    jokeType: 'Math',
  },
  {
    id: 74,
    jokeText: 'What do you call fake spaghetti? An impasta!',
    jokeType: 'Food',
  },
  {
    id: 75,
    jokeText: 'Why did the tomato turn red? Because it saw the salad dressing!',
    jokeType: 'Food',
  },
  {
    id: 76,
    jokeText:
      'What do you get when you cross a snowman and a vampire? Frostbite!',
    jokeType: 'Wordplay',
  },
  {
    id: 77,
    jokeText:
      'Why did the golfer bring two pairs of pants? In case he got a hole in one!',
    jokeType: 'Sports',
  },
  {
    id: 78,
    jokeText:
      'Why are ghosts bad at lying? Because you can see right through them!',
    jokeType: 'Wordplay',
  },
  {
    id: 79,
    jokeText: "Why can't you give Elsa a balloon? Because she will let it go.",
    jokeType: 'Movies',
  },
  {
    id: 80,
    jokeText:
      "I'm reading a book about anti-gravity. It's impossible to put down!",
    jokeType: 'Science',
  },
  {
    id: 81,
    jokeText:
      'I told my wife she was drawing her eyebrows too high. She looked surprised.',
    jokeType: 'Puns',
  },
  {
    id: 82,
    jokeText:
      'What did one ocean say to the other ocean? Nothing, they just waved.',
    jokeType: 'Wordplay',
  },
  {
    id: 83,
    jokeText:
      'Why do we never tell secrets on a farm? Because the potatoes have eyes and the corn has ears.',
    jokeType: 'Wordplay',
  },
  {
    id: 84,
    jokeText: 'How do you organize a space party? You planet!',
    jokeType: 'Science',
  },
  {
    id: 85,
    jokeText:
      "Why don't some couples go to the gym? Because some relationships don't work out.",
    jokeType: 'Puns',
  },
  {
    id: 86,
    jokeText:
      "Parallel lines have so much in common. It's a shame they'll never meet.",
    jokeType: 'Math',
  },
  {
    id: 87,
    jokeText: 'What do you call fake spaghetti? An impasta!',
    jokeType: 'Food',
  },
  {
    id: 88,
    jokeText: 'Why did the tomato turn red? Because it saw the salad dressing!',
    jokeType: 'Food',
  },
  {
    id: 89,
    jokeText:
      'What do you get when you cross a snowman and a vampire? Frostbite!',
    jokeType: 'Wordplay',
  },
  {
    id: 90,
    jokeText:
      'Why did the golfer bring two pairs of pants? In case he got a hole in one!',
    jokeType: 'Sports',
  },
  {
    id: 91,
    jokeText:
      'Why are ghosts bad at lying? Because you can see right through them!',
    jokeType: 'Wordplay',
  },
  {
    id: 92,
    jokeText: "Why can't you give Elsa a balloon? Because she will let it go.",
    jokeType: 'Movies',
  },
  {
    id: 93,
    jokeText:
      "I'm reading a book about anti-gravity. It's impossible to put down!",
    jokeType: 'Science',
  },
  {
    id: 94,
    jokeText:
      'I told my wife she was drawing her eyebrows too high. She looked surprised.',
    jokeType: 'Puns',
  },
  {
    id: 95,
    jokeText:
      'What did one ocean say to the other ocean? Nothing, they just waved.',
    jokeType: 'Wordplay',
  },
  {
    id: 96,
    jokeText:
      'Why do we never tell secrets on a farm? Because the potatoes have eyes and the corn has ears.',
    jokeType: 'Wordplay',
  },
  {
    id: 97,
    jokeText: 'How do you organize a space party? You planet!',
    jokeType: 'Science',
  },
  {
    id: 98,
    jokeText:
      "Why don't some couples go to the gym? Because some relationships don't work out.",
    jokeType: 'Puns',
  },
  {
    id: 99,
    jokeText:
      "Parallel lines have so much in common. It's a shame they'll never meet.",
    jokeType: 'Math',
  },
  {
    id: 100,
    jokeText: 'What do you call fake spaghetti? An impasta!',
    jokeType: 'Food',
  },
];
