"use strict"

let http = require('http');

http.createServer(function (req, res) {
  let route = req.url.split('/');

  if (req.method === 'GET' && route[1] === 'sum') {
    let data = "";

    for (let i = 2; i < route.length; i++) {
      data += route[i];
      if (i !== (route.length - 1)) {
        data += ' ';
      }
    }
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(data);
  } else {
    res.statusCode = 404;
    res.end();
  }
}).listen(8080);
