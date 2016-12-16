const express = require('express');

const router = express.Router();

const user = {
  id: 1,
  name: 'axel'
}

router.use((req, res, next) => {
  console.log("Hola soy el middle ware");
  next();
});

router.all('*', (req, res, next) => {
  if (!req.headers['auth-token']) {
    res.status(400).json({error: 'pelas'});
  } else {
    next();
  }
});

router.get('/:id', (req, res) => {
 res.json(user);
});

router.post('', (req, res) => {
  req.body.id = 2;
  res.status(201).json(req.body);
});

router.put('/:id', (req, res) => {
  res.json(req.body);
});

router.delete('/:id', (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
