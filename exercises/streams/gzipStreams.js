const fs = require('fs');
const zlib = require('zlib');
const file = process.argv[2];

/**
 * In this case little chunks are send to each stream in the chain until
 * all of them finished, the first stream is only readable, the second stream
 * is a duplex? stream and the last one is a writable stream
 **/

fs.createReadStream(file)
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream(file + '.gz'))
  .on('finish', () => console.log('File successfully compressed'));
