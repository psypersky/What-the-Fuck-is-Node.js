'use strict';

const fs = require('fs');
const http = require('http');

http.createServer((req, res) => {
  if(req.method === 'GET' && req.url === '/') {
    res.statusCode = 200;
    //res.writeHead(200);
    fs.createReadStream('./index.html').pipe(res);
  } else {
    res.writeHead(404);
    res.end('Oops! Errorsh.');
  }
}).listen(8000, () => console.log('listening on port 8000'));
