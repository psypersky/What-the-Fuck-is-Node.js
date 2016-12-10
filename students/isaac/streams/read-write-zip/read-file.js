'use strict';

const port = 9000;
const http = require('http');
const fs = require('fs');

let server = http.createServer();

server.on('request', (req, res) => {
  res.writeHead(200);

  let file = fs.createReadStream('myFile.txt');

  file.pipe(res);
});

server.listen(port, () => console.log('listening on port: ' + port));
