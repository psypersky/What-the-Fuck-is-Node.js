const express = require('express');
const service = require('../service');
const crypto = require('../encrypt/encrypt');

const route = express.Router();

const database = require('./rutes').database;


route.post('', (req, res) => {
  if (exist(req.body)) {
    res.status(201).json({
      "auth-token": service.createToken(exist(req.body)),
    }).end();
  } else {
    res.status(400).json({error: 'pelas'});
  }
});

module.exports = route;

function exist (user) {
 return database.find(function (element) {
   var password = user.password ? crypto(user.password) : false;
   if (user.name === element.name && (password === element.password || user.email === element.email)) {
     return true;
   }
 });
}
