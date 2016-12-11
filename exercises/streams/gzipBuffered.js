const fs = require('fs');
const zlib = require('zlib');
const file = process.argv[2];

/**
  fs.readFile reads the hole contents of the file, store them in a buffer,
  then when it has all the file stored in the buffer it calls the callback sent
  to it, then zlib.gzip is called, when it has all the file gzipped it call
  its callback and the write file get the bugger and save it to disk
**/

 fs.readFile(file, 'utf8', (err, string) => {
   console.log(buffer.toString('utf8'));
   zlib.gzip(string, (err, bufferComprimido) => {
     console.log(bufferComprimido.toString('utf8'));
     fs.writeFile(file + '.gz', bufferComprimido, err => {
       console.log('File successfully compressed');
     });
   });
 });
