"use strict";

const http = require('http');
const fs = require('fs');

let myServer = http.createServer( function( request, response ) {
  if (request.method === "GET") {
    let readStream = fs.createReadStream("index.html");
    response.writeHead(200, {"Content-type": "text/html"});
    readStream.pipe(response);
  } else {
    response.writeHead(404);
    response.write("404: Route not found");
    response.end();
  }
}).listen(8080);
