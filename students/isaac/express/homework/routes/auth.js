const express = require('express'),
      db = require('../db');

// prefix -> /auth
const auth = express.Router();

auth.post('/', (req, res) => {
  //console.log('[req body]', req.body);
  let username = req.body.name,
      password = req.body.password;

  db.findUserBy('name', username, (user) => {
    if (!user || user.password !== password) {
      res.sendStatus(400);
    }
    res.sendStatus(200);
  });
});

module.exports = auth;
