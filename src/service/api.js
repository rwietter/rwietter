const axios = require('axios');

const API = axios.create({
  baseURL: `https://api.deezer.com/playlist/9278324062`,
});

module.exports = { API }
