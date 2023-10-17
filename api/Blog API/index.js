import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 4000;

// In-memory data store
let posts = [
  {
    id: 1,
    title: 'The Rise of Decentralized Finance',
    content:
      'Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.',
    author: 'Alex Thompson',
    date: '2023-08-01T10:00:00Z',
  },
  {
    id: 2,
    title: 'The Impact of Artificial Intelligence on Modern Businesses',
    content:
      "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
    author: 'Mia Williams',
    date: '2023-08-05T14:30:00Z',
  },
  {
    id: 3,
    title: 'Sustainable Living: Tips for an Eco-Friendly Lifestyle',
    content:
      "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
    author: 'Samuel Green',
    date: '2023-08-10T09:15:00Z',
  },
];

let lastId = 3;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Write your code here//
function getCurrentUTCDateString() {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, '0');
  const day = String(now.getUTCDate()).padStart(2, '0');
  const hours = String(now.getUTCHours()).padStart(2, '0');
  const minutes = String(now.getUTCMinutes()).padStart(2, '0');
  const seconds = String(now.getUTCSeconds()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
}

//CHALLENGE 1: GET All posts
app.get('/posts', (req, res) => {
  res.json(posts);
});

//CHALLENGE 2: GET a specific post by id
app.get('/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);

  const searchIndex = posts.findIndex((post) => postId === post.id);

  if (searchIndex > -1) {
    res.json(posts[searchIndex]);
  } else {
    res.status(404).json({ error: `Post with ID ${postId} not found` });
  }
});

//CHALLENGE 3: POST a new post
app.post('/posts', (req, res) => {
  const { title, content, author } = req.body;

  if (title.trim() === '' || content.trim() === '' || author.trim() === '') {
    res.status(500).json({ error: `Make sure any of the input is not empty` });
  }
  if (author.length < 3) {
    res
      .status(500)
      .json({ error: `Author name should have more than 3 character` });
  }
  if (content.length < 20) {
    res.status(500).json({ error: `Post should have a minimum 20 character` });
  }

  lastId++;
  const newPost = {
    id: lastId,
    author: author,
    content: content,
    title: title,
    date: getCurrentUTCDateString(),
  };

  if (title && author && content) {
    posts.push(newPost);
    res.json({message: "New Post"})
  }
});

//CHALLENGE 4: PATCH a post when you just want to update one parameter
app.patch('/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const { title, content, author } = req.body;
  console.log(req.body);

  const existingPost = posts.find((post) => postId === post.id);
  console.log(title);

  if (title.trim() === '' || content.trim() === '' || author.trim() === '') {
    res.status(500).json({ error: `Make sure any of the input is not empty` });
  }
  if (author.length < 3) {
    res
      .status(500)
      .json({ error: `Author name should have more than 3 character` });
  }
  if (content.length < 20) {
    res.status(500).json({ error: `Post should have a minimum 20 character` });
  }
  const searchIndex = posts.findIndex((post) => postId === post.id);

  lastId++;
  const updatedPost = {
    id: postId,
    author: author || existingPost.author,
    content: content || existingPost.content,
    title: title || existingPost.content,
    date: getCurrentUTCDateString(),
  };

  if (searchIndex > -1) {
    posts[searchIndex] = updatedPost;
    res.json({ message: 'Edited' });
  } else {
    res.status(404).json({ error: `Post with ID ${postId} not found` });
  }
});

//CHALLENGE 5: DELETE a specific post by providing the post id.
app.delete('/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const searchIndex = posts.findIndex((post) => postId === post.id);
  if (searchIndex > -1) {
    posts.splice(searchIndex, 1);
    res.json({ message: 'Post deleted' });
  } else {
    res.status(404).json({ error: `Post with ID ${postId} not found` });
  }
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
