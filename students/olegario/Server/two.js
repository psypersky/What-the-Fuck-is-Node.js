"use strict"

var http = require('http');
var fs   = require('fs');

fs.readFile('./test.txt', function (err, data) {
  http.createServer(function (req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(data);
  }).listen(8080);
});
