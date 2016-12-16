const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send('Hello World!');
});

app.listen(3030, () => {
  console.log("Listening in port 3030");
});

module.exports = app;
