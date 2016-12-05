'use strict';

const port = 9000;
const http = require('http');
const fs = require('fs');

let server = http.createServer();

server.on('request', (req, res) => {
  res.writeHead(200);

  let destinationFile = fs.createWriteStream('userInput.txt');

  req.pipe(destinationFile);

  req.on('end', function() {
    console.log('done!');
    res.end();
  });
});

server.listen(port, () => console.log('listening on port: ' + port));
