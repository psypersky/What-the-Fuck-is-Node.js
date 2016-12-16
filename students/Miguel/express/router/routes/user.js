const express = require('express');

const router = express.Router();

const user = {
  id: 1,
  name: "Migue"
};

router.all("*", (req, res, next) => {
  console.log("Tons que");
  if (!req.headers['auth-token']) {
    res.status(400).json({error: "pelas"});
  }
  next();
});

router.get("/:id", (req, res) => {
  res.json(user);
});

router.post("", (req, res) => {
  req.body.id = 2;
  res.status(201).json(req.body);
});

router.put("/:id", (req, res) => {
  res.json(req.body);
});

router.delete("/:id", (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
