import express from 'express';
import axios from 'axios';

const app = express();
const port = 3000;
const API_URL = 'https://secrets-api.appbrewery.com/';

//TODO 1: Fill in your values for the 3 types of auth.
const yourUsername = 'abdulmaleekadams';
const yourPassword = 'webdev123';
const yourAPIKey = '81e6f875-1e6b-4703-be0c-52aac8d276a0';
const yourBearerToken = '3d68f864-2fd4-44c6-a6c6-348976300b70';

const endpoint = 'https://secrets-api.appbrewery.com';

app.get('/', (req, res) => {
  res.render('index.ejs', { content: 'API Response.' });
});

app.get('/noAuth', async (req, res) => {
  try {
    const response = await axios.get(`${endpoint}/random`);

    const responsData = await response.data;
    res.render('index.ejs', { content: JSON.stringify(responsData) });
  } catch (error) {
    console.error(`Failed to make request, ${error.message}`);
    res.status(500).send('Failed to fetch, Please try again');
  }
});

app.get('/basicAuth', async (req, res) => {
  try {
    const response = await axios.get(`${endpoint}/all?page=1`, {
      auth: {
        username: yourUsername,
        password: yourPassword,
      },
    });

    const responsData = await response.data;
    res.render('index.ejs', { content: JSON.stringify(responsData) });
  } catch (error) {
    console.error(`Failed to make request, ${error.message}`);
    res.status(500).send('Failed to fetch, Please try again');
  }
});

app.get('/apiKey', async (req, res) => {
  try {
    const response = await axios.get(`${endpoint}/filter`, {
      params: {
        score: 5,
        apiKey: yourAPIKey,
      },
    });

    const responsData = await response.data;
    res.render('index.ejs', { content: JSON.stringify(responsData) });
  } catch (error) {
    console.error(`Failed to make request, ${error.message}`);
    res.status(500).send('Failed to fetch, Please try again');
  }
});

app.get('/bearerToken', async (req, res) => {
  try {
    const response = await axios.get(`${endpoint}/secrets/49`, {
      headers: {
        Authorization: `Bearer ${yourBearerToken}`,
      },
    });

    const responsData = await response.data;
    res.render('index.ejs', { content: JSON.stringify(responsData) });
  } catch (error) {
    console.error(`Failed to make request, ${error.message}`);
    res.status(500).send('Failed to fetch, Please try again');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
