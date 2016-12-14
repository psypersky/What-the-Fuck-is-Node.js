'use strict';

const LineStream = require('./line-stream');
const ObjectStream = require('./object-stream');
const fs = require('fs');

let lineReader = new LineStream({
  //objectMode: true, /// What's the difference of this one from the below.
  readableObjectMode: true
});

let objectStream = new ObjectStream({
  readableObjectMode: true
});

let source = fs.createReadStream('json2.json');
let output = fs.createWriteStream('output2.txt');

source.pipe(lineReader).pipe(objectStream).pipe(output);

// let nLine = 1;
// objectStream.on('readable', () => {
//   let line;
//   while (null !== (line = objectStream.read())) {
//     console.log(nLine, line);
//     nLine++;
//   }
// });
