const express = require("express");

const app = express();

const user = {
  id: 1,
  name: "Sara"
};

app.get("/user/:id", (req,res) => {
  res.json(user);
});

app.post("/user", (req,res) => {
  res.body.id = 2;
  res.status(201).json(req.body);
});

app.put("/user/:id", (req,res) => {
  res.json(req.body);
});

app.delete("/user/:id", (req,res) => {
  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

module.exports = app;
