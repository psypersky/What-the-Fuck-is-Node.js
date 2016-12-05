'use strict';

const port = 9001;
const http = require('http');
const zlib = require('zlib');
const fs = require('fs');

http.createServer((request, response) => {
  // 'Content-Type': 'application/gzip'
  //response.writeHead(200, {'Content-Type': 'application/gzip', 'Content-Encoding': 'gzip'});
  response.writeHead(200, {'Content-Type': 'application/zip', 'Content-disposition': 'attachment; filename=myFile.zip'});

  let outputFile = fs.createWriteStream('output.txt');
  let outputZipFile = fs.createWriteStream('output.txt.gz');

  let gzip = request.pipe(zlib.createGzip()); // creates zip file

  request.pipe(outputFile); // stores raw data into disk;

  gzip.pipe(outputZipFile); // stores the zip file into disk

  gzip.pipe(response); // returns zip to user

  // request.on('end', function() {
  //   response.write('Done!');
  //   response.end();
  // });

  // let text = 'hola';
  // zlib.gzip(text, function (_, result) {  // The callback will give you the
  //     response.end(result);                     // result, so just send it.
  // })
}).listen(port, '0.0.0.0', () => console.log('listening on port: ' + port));
