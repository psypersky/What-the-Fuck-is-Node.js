const express = require('express');

const app = express();

app.get("/", (req, res) => {
  res.send('Hello World!');
});

app.listen(3030, () => {
  console.log("Listening in port 3030");
});

module.exports = app;
