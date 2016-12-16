const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const user = {
  id: 1,
  name: "Migue"
};

app.use((req, res, next) => {
  console.log("Time: " + Date.now());
  next();
})

app.all("/user*", (req, res, next) => {
  console.log("Tons que");
  if (!req.headers['auth-token']) {
    res.status(400).json({error: "pelas"});
  }
  next();
});

app.get("/user/:id", (req, res) => {
  res.json(user);
});

app.post("/user", (req, res) => {
  req.body.id = 2;
  res.status(201).json(req.body);
});

app.put("/user/:id", (req, res) => {
  res.json(req.body);
});

app.delete("/user/:id", (req, res) => {
  res.sendStatus(200);
});

app.listen(3030, () => {
  console.log("Listening in port 3030");
});

module.exports = app;
