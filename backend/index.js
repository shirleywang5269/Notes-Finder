const express = require('express');
const axios = require('axios');
const querystring = require('querystring');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Data specific to UMLS Authentication
// Replace these with your own items:
const MY_API_KEY = 'c1d74116-7c2b-49b2-b2f4-e67edc1a1b21';
const BASE_URL = 'https://uts-ws.nlm.nih.gov';
const TGT =
  'TGT-1891259-cJcfn0rakuVit9BRXT9wlaUWbKEo3zjV7RlqMCocOJsksDRfhf-cas';

// Display a welcome message on the / route
app.get('/', (req, res) =>
  res.send('Hello! The UMLS backend is running properly.')
);

// This function gets a service ticket everytime we need to make an API request
const get_ticket = async () => {
  const AUTH_URL = 'https://utslogin.nlm.nih.gov';
  const url = AUTH_URL + '/cas/v1/api-key/' + TGT;

  // Make the POST request
  const data = { service: 'http://umlsks.nlm.nih.gov' };
  try {
    const response = await axios.post(url, querystring.stringify(data));
    return response.data;
  } catch (error) {
    console.error(error);
    return;
  }
};

// A search function which searches UMLS for a given term
const search = async term => {
  // Get the service ticket
  const ticket = await get_ticket();

  // Set up the serach query
  const url = BASE_URL + '/rest/search/current';
  const data = { string: term, searchType: 'words', ticket: ticket };

  // Make the POST request
  try {
    const response = await axios.get(url, { params: data });
    return response.data;
  } catch (error) {
    console.error(error);
    return;
  }
};

// A test ticket route to get the test ticket
app.get('/ticket', async (req, res) => {
  // Get the service ticket
  const service_ticket = await get_ticket();
  if (service_ticket === null) {
    res.json({ Error: 'Could not get service ticket' });
  } else {
    res.send(service_ticket);
  }
});

// End point to search UMLS
app.post('/search', async (req, res) => {
  console.dir(req.body);
  const term = req.body.term;
  const search_results = await search(term);
  res.send(search_results);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
