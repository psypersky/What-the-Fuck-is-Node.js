const express = require('express');
const bodyParser = require('body-parser');
const querystring = require('querystring');
const app = express();

app.use(bodyParser.json());

const db = [];

// app.get('/', function (req, res) {
//  res.sendStatus(200);
// });
//
// let i;
//
// app.post('/user', function (req, res) {
//   let nuevo = req.body;
//   let number = i++;
//   nuevo.id = number.toString();
//   db.push(req.body);
//   res.status(201).json(req.body);
// });
//
// app.post('/auth', function (req, res) {
//   var user = req.body;
//   var match = db.find(function (current) {
//     return current.name === user.name && current.email === user.email;
//   });
//   if (match) {
//     res.status(200).json(match);
//   }
// });

app.listen(3000, function () {
  console.log("Running on 3000");
});

module.exports = app;
