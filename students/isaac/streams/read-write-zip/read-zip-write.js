'use strict';

const port = 9000;
const fs = require('fs');
const zlib = require('zlib');
const gzip = zlib.createGzip();

let picture = fs.createReadStream('green-earth.jpg');
let zipFile = fs.createWriteStream('picture.jpg.gz');

picture.pipe(gzip).pipe(zipFile);
