const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const usersDB = [];

app.post('/user', (req, res) => {
  req.body.id = usersDB.length + 1;
  usersDB.push(req.body);
  res.status(201).json(usersDB[usersDB.length - 1]);
});

app.post('/auth', (req, res) => {
  const flag = usersDB.findIndex((elem) => {
    return elem.name === req.body.name &&
           elem.email === req.body.email &&
           elem.password === req.body.password;
  });
  if (flag >= 0) {
    res.status(200).json(usersDB[req.body.id - 1]);
  } else {
    res.status(400).json({error: 'Dx'});
  }
});

app.get('/user/:id', (req, res) => {
  const flag = usersDB.findIndex((elem) => {
    return elem.id === +req.params.id;
  });
  if (flag >= 0) {
    res.status(200).json(usersDB[flag]);
  } else {
    res.status(404).json({error: 'Dx'});
  }
});

app.put('/user/:id', (req, res) => {
  const flag = usersDB.findIndex((elem) => {
    return elem.id === +req.params.id;
  });
  if (flag >= 0 && req.body.name) {
    usersDB[+req.params.id - 1].name = req.body.name;
    res.status(200).json(usersDB[+req.params.id - 1]);
  } else {
    res.status(400).json({error: 'Dx'});
  }
});

app.del('/user/:id', (req, res) => {
  const flag = usersDB.findIndex((elem) => {
    return elem.id === +req.params.id;
  });
  if (flag >= 0) {
    usersDB.splice((+req.params.id - 1), 1);
    res.status(200).end();
  } else {
    res.status(404).json({error: 'Dx'});
  }
})

module.exports = app;
