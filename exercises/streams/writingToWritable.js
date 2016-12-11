/**
 * We can write manually to writable streams with the function 'write',
 * to finish writing (end of stream) you can the funcion 'end', you can
 * also send data in the text funcion to write before ending the stream
 **/

const fs = require('fs');
const ws = fs.createWriteStream('./tempResFile1.txt');

ws.write('foo bar ');
ws.end('bas');
