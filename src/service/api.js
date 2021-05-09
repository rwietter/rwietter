const axios = require('axios');

const API = axios.create({
  baseURL: `https://api.deezer.com/playlist/8794815242`,
});

module.exports = { API }
